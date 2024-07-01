package com.daeut.daeut.main.service;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.daeut.daeut.main.dto.Files;
import com.daeut.daeut.main.mapper.FileMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    @Value("${upload.path}")   // application.properties에 설정한 업로드 경로를 가져옴
    private String uploadPath;

    @Override
    public List<Files> list() throws Exception {
        //  파일 목록 조회
        List<Files> fileList = fileMapper.list();
        return fileList;
    }

    @Override
    public Files select(int fileNo) throws Exception {
        //  파일 조회
        Files file = fileMapper.select(fileNo);
        return file;
    }

    @Override
    public int insert(Files file) throws Exception {
        //  파일 등록
        int result = fileMapper.insert(file);
        return result;
    }

    @Override
    public int update(Files file) throws Exception {
        //  파일 수정
        int result = fileMapper.update(file);
        return result;
    }

    @Override
    public int delete(int fileNo) throws Exception {
        // 파일 정보 조회
        Files file = fileMapper.select(fileNo);

        //  DB에서 파일 삭제
        int result = fileMapper.delete(fileNo);

        // 실제 파일 삭제
        if(result > 0){
            String path = file.getFilePath();
            File deleteFile = new File(path);
            
            // 파일 존재 여부 확인
            if( !deleteFile.exists())  return result;

            // 파일 삭제
            if( deleteFile.delete() ){
                // log.info("파일이 정상적으로 삭제...");
                // log.info("file? "+path);
            }else  log.info("파일 삭제 실패...");
        }

        return result;
    }

    @Override
    public List<Files> listByParent(Files file) throws Exception {
        //  부모 테이블에 종속된 파일 목록 조회
        List<Files> fileList = fileMapper.listByParent(file);
        return fileList;
    }

    @Override
    public int deleteByParent(Files file) throws Exception {
        // 파일 목록 조회
        List<Files> fileList =  fileMapper.listByParent(file);
        
        for (Files deleteFile : fileList) {
            int no = deleteFile.getFileNo();
            delete(no); 
        }

        //  부모 테이블에 종속된 파일 목록 삭제
        int result = fileMapper.deleteByParent(file);

        // log.info(result+"개의 파일 삭제...");
        return result;
    }

    @Override
    public Files upload(Files file) throws Exception {
        Files uploadedFile = uploadFile(file, file.getFile());
        if (uploadedFile != null)   
            log.info("파일 업로드 성공");

        return uploadedFile;
    }

    // 파일 업로드 로직
    public Files uploadFile(Files fileInfo, MultipartFile file) throws Exception{
        // log.info("fileInfo? {}", fileInfo);
        // log.info("file? {}", file);

        int result = 0;
        if (file.isEmpty()){
            return null;
        }

        // 📄 파일 원본명, 사이즈, 데이터
        String originName = file.getOriginalFilename();
        long fileSize = file.getSize();
        byte[] fileData = file.getBytes();

        // 파일명 중복 방지
        String fileName = UUID.randomUUID().toString() + "_" + originName;
        String filePath = uploadPath + "/" + fileName;

        // 파일 시스템에 복사 (업로드)
        File uploadFile = new File(uploadPath, fileName);
        FileCopyUtils.copy(fileData,uploadFile);

        // DB에 파일 정보 등록
        Files uploadedFile = new Files();
        uploadedFile.setParentTable(fileInfo.getParentTable());
        uploadedFile.setParentNo(fileInfo.getParentNo());
        uploadedFile.setFileName(fileName);
        uploadedFile.setFilePath(filePath);
        uploadedFile.setFileSize(fileSize);
        uploadedFile.setOriginFileName(originName);
        uploadedFile.setFileCode(fileInfo.getFileCode());

        log.info("uploadedFile? {}",uploadedFile);

        result = fileMapper.insert(uploadedFile);
        log.info("result? {}",result);
        return uploadedFile;
    }

    @Override
    public List<Files> uploadFiles(Files fileInfo, List<MultipartFile> fileList) throws Exception {
        // log.info("fileInfo? {}", fileInfo);
        // log.info("fileList? {}", fileList.toString());

        List<Files> uploadedFileList = new ArrayList<Files>();

        // log.info("uploadFiles? {}", uploadPath.toString());

        // for (MultipartFile file : fileList) {
        //     Files uploadedFile = uploadFile(fileInfo, file);
        //     uploadedFileList.add(uploadedFile);
        //     log.info("업로드된 파일? {}", uploadedFile);
        // }

        int index = 0;
        for (MultipartFile file : fileList) {
            // 첫 번째 파일일 경우 fileCode를 1로 설정
            if (index == 0) {
                fileInfo.setFileCode(1);
                Files uploadedFile = uploadFile(fileInfo, file);
                uploadedFileList.add(uploadedFile);
            } else {
                fileInfo.setFileCode(0);
                Files uploadedFile = uploadFile(fileInfo, file);
                uploadedFileList.add(uploadedFile);
            }
            index++;
        }

        return uploadedFileList;
    }

    @Override
    public int download(int no, HttpServletResponse response) throws Exception {
       Files file = fileMapper.select(no);

       if(file == null){
        // BAD_REQUEST : 400, 클라이언트 요청이 잘못됨을 알리는 상태코드
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        return 0;
       }

       String filePath = file.getFilePath();
       String fileName = file.getFileName();

        // 파일 다운로드를 위한 헤더 세팅
        // Content-Type : application/octect-stream
        // Content-Disposition : attachment; filename="파일명.확장자"
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment; fileName=\"" + fileName + "\"");

        // 파일 다운로드
        // - 파일 입력
        File downloadFile = new File(filePath);
        FileInputStream fis = new FileInputStream(downloadFile);

        // - 파일 출력
        ServletOutputStream sos = response.getOutputStream();

        // - 다운로드
       FileCopyUtils.copy(fis, sos);

        // Java - File I/O
        // byte[] buffer = new byte[1024];             // 1024bytes : 1KB
        // int data;
        // while ((data = fis.read(buffer)) != -1) {   // 1KB 입력
        //     sos.write(buffer,0,data);           // 1KB 출력(전송)
        // }
        fis.close();
        sos.close();
        return 1;
    }
}