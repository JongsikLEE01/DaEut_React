package com.aloha.server.main.controller;

import java.io.File;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.main.dto.Files;
import com.aloha.server.main.service.FileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/file")
public class FileController {
    @Autowired
    FileService fileService;

    @Value("${upload.path}")   // application.properties에 설정한 업로드 경로를 가져옴
    private String path;

    /**
     * 파일 업로드
     * @param file
     * @return
     */
    @PostMapping("")
    public ResponseEntity<?> create(Files file) {
        log.info("file? "+file);
        try {
            Files uploadedFile = fileService.upload(file);

            return new ResponseEntity<>(uploadedFile, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 파일 다운로드
     * @param no
     * @param response
     * @throws Exception
     */
    @GetMapping("/{no}")
    public void fileDownload(@PathVariable("no") int no, HttpServletResponse response) throws Exception{
        fileService.download(no, response);
    }

    @DeleteMapping("/{fileNo}")
    public ResponseEntity<String> deleteFile(@PathVariable("fileNo") int fileNo) throws Exception{
        // log.info("DELETE - /file/"+fileNo);

        //파일 삭제 요청
        int result = fileService.delete(fileNo);

        // 삭제 실패
        if(result == 0) return new ResponseEntity<>("FAIL",HttpStatus.OK);

        // 삭제 성공
        return new ResponseEntity<>("SUCCESS",HttpStatus.OK);
    }
    
    /**
     * 이미지 썸네일
     * @param param
     * @return
     */
    @GetMapping("/img/{fileNo}")
    public ResponseEntity<byte[]> tumbnailImg(@PathVariable("fileNo") int fileNo) throws Exception{
        // 파일번호로 파일 정보 조회
        Files file = fileService.select(fileNo);

        // 이미지 컨텐츠 타입 지정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);

        // null 체크
        if(file == null){
            String filePath = path + "/no-image.png";
            File noImgFile = new File(filePath);
            byte[] noImgFileData = FileCopyUtils.copyToByteArray(noImgFile);

            return new ResponseEntity<>(noImgFileData, headers,HttpStatus.OK);
        }

        // 파일 정보 중에서 파일 경로를 추출
        String path = file.getFilePath();

        // 파일 객체 생성
        File f = new File(path);

        // 파일 데이터
        byte[] fileData = FileCopyUtils.copyToByteArray(f);

        
        // headers.setContentType(MediaType.IMAGE_PNG);

        // new ResponseEntity<>(데이터, 헤더, 상태코드)
        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }    

    /**
     * 파일 삭제
     * @param no
     * @return
     */
    @DeleteMapping("/{no}")
    public ResponseEntity<?> delete(@PathVariable("no") Integer no) {
        try {
            if(no == null)
                return new ResponseEntity<>("잘못된 요청입니다...",HttpStatus.BAD_REQUEST);

            int result = fileService.delete(no);
            if(result > 0)
                return new ResponseEntity<>("파일 삭제 성공...", HttpStatus.OK);
            else
                return new ResponseEntity<>("파일 삭제 실패...",HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("파일 삭제 실패...", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}