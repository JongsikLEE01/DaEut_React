package com.aloha.server.reservation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.main.dto.Files;
import com.aloha.server.main.dto.Option;
import com.aloha.server.main.dto.ServicePage;
import com.aloha.server.main.service.FileService;
import com.aloha.server.reservation.dto.Event;
import com.aloha.server.reservation.dto.Services;
import com.aloha.server.reservation.mapper.ReservationMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReservationServiceImpl implements ReservationService{

    @Autowired
    private ReservationMapper reservationMapper;
    @Autowired
    private FileService fileService;
    // @Autowired
    // private ReservationRepository reservationRepository;

    private static final int THUMBNAIL_FILE_CODE = 1;

    @Override
    public List<Services> serviceList(ServicePage servicePage, Option option) throws Exception {
        // 게시글 데이터 개수 조회
        int total = reservationMapper.count(option);
        servicePage.setTotal(total);
        
        // 목록 조회
        List<Services> serviceList = reservationMapper.serviceList(servicePage, option);

        return serviceList;
    }

    // 게시글 조회
    @Override
    public Services serviceSelect(int serviceNo) throws Exception {
        log.info("serviceNo {}", serviceNo);
        // 조회
        Services service = reservationMapper.serviceSelect(serviceNo);
        
        return service;
    }

    @Override
    public Services serviceInsert(Services service) throws Exception {
        // 쓰기
        int result = reservationMapper.serviceInsert(service);
        log.info("service {}", service);
        log.info("result {}", result);
        int newServiceNo = service.getServiceNo();
        log.info("newServiceNo {}", newServiceNo);
        Services newService = reservationMapper.serviceSelect(newServiceNo);
        
        int uploadresult = upload(service);
        log.info("파일 업로드 개수 {}", uploadresult);

        return newService;
    }

    @Override
    public int serviceUpdate(Services service) throws Exception {
        // 기존 파일 삭제
        log.info("implService {}", service);
        int oldServiceNo = service.getServiceNo();
        log.info("implServiceNo 개수 {}", oldServiceNo);
        Files selectFile = new Files();
        selectFile.setParentNo(oldServiceNo);
        selectFile.setParentTable("service");
        int deleteResult = fileService.deleteByParent(selectFile);
        log.info("삭제된 파일 개수 {}", deleteResult);

        // 파일 업로드
        int uploadResult = upload(service);
        log.info("파일 업로드 개수 {}", uploadResult);
        int result = reservationMapper.serviceUpdate(service);
        return result;
    }

    @Override
    public int serviceDelete(int serviceNo) throws Exception {
        int result = reservationMapper.serviceDelete(serviceNo);
        
        Files file = new Files();
        file.setParentTable("service");
        file.setParentNo(serviceNo);;
        List<Files> deleteFileList = fileService.listByParent(file);

        for (Files deleteFile : deleteFileList) {
            fileService.delete(deleteFile.getFileNo());
        }

        return result;
    }
    
    @Override
    public List<Services> serviceSearch(Option option) throws Exception {
        // 검색
        return reservationMapper.search(option);
    }

    @Override
    public Files SelectThumbnail(int serviceNo) throws Exception {
        // 썸네일
        Files thumbnail = reservationMapper.SelectThumbnail(serviceNo);
        return thumbnail;
    }

    @Override
    public Files partnerThumbnail(int partnerNo) throws Exception {
        // 썸네일
        Files pthumbnail = reservationMapper.partnerThumbnail(partnerNo);
        return pthumbnail;
    }
    
    @Override
    public List<Files> SelectFiles(int serviceNo) throws Exception {
        // 파일
        List<Files> files = reservationMapper.SelectFiles(serviceNo);
        
        return files;
    }

    @Override 
    public Files getFileByServiceNum (int serviceNo) throws Exception {
        // 리뷰 이미지
        Files rFiles = reservationMapper.getFileByServiceNum(serviceNo);
        return rFiles;
    }

    @Override
    public List<Event> calendarListByServiceNo(int serviceNo) throws Exception {
        List<Event> eventList = reservationMapper.calendarListByServiceNo(serviceNo);
        return eventList;
    }

    @Override
    public Services select(int serviceNo) throws Exception {
        return reservationMapper.serviceSelect(serviceNo);
    }

     @Override
    public int upload(Services service) throws Exception {
        // 파일 업로드
        Files fileInfo = new Files();
        String parentTable = "service";
        fileInfo.setParentTable(parentTable);
        fileInfo.setParentNo(service.getServiceNo());
        List<MultipartFile> fileList = service.getFile();

        if(fileList == null || fileList.isEmpty()){
            log.info("첨부 파일 없음...");
            return 0;
        }

        List<Files> uploadedFileList = fileService.uploadFiles(fileInfo, fileList);
        if (uploadedFileList == null || uploadedFileList.isEmpty()) {
            log.info("파일 업로드 실패...");
            return 0;
        }else{
            log.info("파일 업로드 성공...");
            log.info(uploadedFileList.toString());
            return uploadedFileList.size();
        }
    }   
}
