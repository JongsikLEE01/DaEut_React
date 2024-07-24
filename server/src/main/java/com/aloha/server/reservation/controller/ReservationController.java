package com.aloha.server.reservation.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.auth.dto.Review;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.auth.service.ReviewService;
import com.aloha.server.auth.service.UserService;
import com.aloha.server.main.dto.Files;
import com.aloha.server.main.dto.Option;
import com.aloha.server.main.dto.ServicePage;
import com.aloha.server.main.service.FileService;
import com.aloha.server.partner.dto.Partner;
import com.aloha.server.partner.service.PartnerService;
import com.aloha.server.reservation.dto.Services;
import com.aloha.server.reservation.service.ReservationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private FileService fileService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @Autowired
    private PartnerService partnerService;

    /**
     * 전체 조회
     * @write jslee
     * @param servicePage
     * @param option
     * @return
     * @throws Exception
     */
    @GetMapping("")
    public ResponseEntity<?> getAllServices(ServicePage page, Option option) {
        try {
            String keyword = option.getKeyword();
            if (keyword == null || keyword.isEmpty()) {
                keyword = "";
                option.setKeyword(keyword);
            }
            List<Services> serviceList = reservationService.serviceList(page, option);
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("serviceList", serviceList);
            responseMap.put("page", page.getTotal());       // totalCount 설정
            
            return ResponseEntity.ok().body(responseMap);
        } catch (Exception e) {
            log.error("Error occurred while fetching reservation details", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Internal Server Error occurred while fetching reservation details");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    /**
     * 단일 조회
     * @write jslee
     * @param serviceNo
     * @param file
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/{serviceNo}")
    public ResponseEntity<?> reservationRead(@PathVariable("serviceNo") int serviceNo) {
        log.info("Fetching details for serviceNo: " + serviceNo);
        try {
            // 서비스 정보 가져오기
            Services service = reservationService.serviceSelect(serviceNo);
            List<Files> files = reservationService.SelectFiles(serviceNo);
            List<Review> reviews = reviewService.getReviewByServiceNo(serviceNo);
    
            // 파트너 정보 가져오기
            int partnerNo = service.getPartnerNo();
            Partner partner = partnerService.selectByPartnerNo(partnerNo);
            Users pUsers = userService.findUserById(partner.getUserNo());
            Files pthumbnail = reservationService.partnerThumbnail(partnerNo);
    
            // 리뷰 데이터에 파일 정보 추가
            for (Review review : reviews) {
                Files reviewFilesQuery = new Files();
                reviewFilesQuery.setParentTable("review");
                reviewFilesQuery.setParentNo(review.getReviewNo());
    
                log.info("Fetching files for review with query: {}", reviewFilesQuery);
    
                List<Files> reviewFiles = fileService.listByParent(reviewFilesQuery);
    
                // 로깅 추가
                if (reviewFiles != null && !reviewFiles.isEmpty()) {
                    log.info("Found files for review {}: {}", review.getReviewNo(), reviewFiles);
                } else {
                    log.info("No files found for review {}", review.getReviewNo());
                }
    
                review.setRFiles(reviewFiles);
    
                log.info("Review {} files after setting: {}", review.getReviewNo(), review.getRFiles());
            }
    
            // 서비스 관련 파일 목록 가져오기
            Files serviceFilesQuery = new Files();
            serviceFilesQuery.setParentTable("service");
            serviceFilesQuery.setParentNo(serviceNo);
            List<Files> fileList = fileService.listByParent(serviceFilesQuery);
    
            // 평균 평점 가져오기
            int averageRating = reviewService.getAverageRatingByServiceNo(serviceNo);
    
            // Response 맵 구성
            Map<String, Object> response = new HashMap<>();
            response.put("serviceNo", serviceNo);
            response.put("service", service);
            response.put("fileList", fileList);
            response.put("files", files);
            response.put("reviews", reviews);
            response.put("partner", partner);
            response.put("pUsers", pUsers);
            response.put("averageRating", averageRating);
            response.put("pthumbnail", pthumbnail);
    
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            log.error("Error occurred while fetching reservation details", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Internal Server Error occurred while fetching reservation details");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    

    /**
     * 서비스 등록
     * @write jslee
     * @param service
     * @param session
     * @return
     */
    @PostMapping("")
    public ResponseEntity<String> reservationInsert(Services service) {
        try {
            Services newService = reservationService.serviceInsert(service);

            log.info(service + " : service");
            if (newService == null) {
                log.info("게시글 등록 실패...");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 등록 실패");
            }

            log.info("게시글 등록 성공...");
            return ResponseEntity.ok("게시글 등록 성공");
        } catch (Exception e) {
            log.error("게시글 등록 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }
    
    /**
     * 수정처리
     * @param service
     * @return
     * @throws Exception
     */
    @PutMapping("")
    public ResponseEntity<String> updatePro(Services service) {
        log.info("서비스 수정....");
        log.info("service {}", service);
        try {
            int result = reservationService.serviceUpdate(service);

            if (result == 0) {
                log.info("게시글 수정 실패...");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 수정 실패");
            }

            log.info("게시글 수정 성공...");
            return ResponseEntity.ok("게시글 수정 성공");
        } catch (Exception e) {
            log.error("게시글 수정 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    /**
     * 글 삭제
     * @write jslee
     * @param serviceNo
     * @return
     * @throws Exception
     */
    @DeleteMapping("/{serviceNo}")
    public ResponseEntity<String> reservationDelete(@PathVariable("serviceNo") int serviceNo) {
        try {
            int result = reservationService.serviceDelete(serviceNo);

            if (result == 0) {
                log.info("게시글 삭제 실패...");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("게시글 삭제 실패");
            }

            Files file = new Files();
            file.setParentTable("service");
            file.setParentNo(serviceNo);
            fileService.deleteByParent(file);

            log.info("게시글 삭제 성공...");
            return ResponseEntity.ok("게시글 삭제 성공");
        } catch (Exception e) {
            log.error("게시글 삭제 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }
 
    /**
     * 리뷰삭제
     * @param userNo
     * @param reviewNo
     * @return
     */
    @DeleteMapping("/reviewDelete")
    public ResponseEntity<String> reviewDelete(@RequestParam("userNo") int userNo, @RequestParam("reviewNo") int reviewNo) {
        try {
            int reviewResult = reviewService.reviewDelete(reviewNo);

            if (reviewResult > 0) {
                Files file = new Files();
                file.setParentTable("review");
                file.setParentNo(reviewNo);

                try {
                    int fileResult = fileService.deleteByParent(file);

                    if (fileResult > 0) {
                        log.info("리뷰 및 파일 삭제 성공");
                    } else {
                        log.warn("리뷰는 삭제되었지만 파일 삭제에 실패했습니다. 파일이 없을 수 있습니다.");
                    }
                } catch (Exception e) {
                    log.error("파일 삭제 중 예외 발생: ", e);
                    // 필요하다면 여기서 예외 처리 로직 추가
                }

                return ResponseEntity.ok("리뷰 및 파일 삭제 성공");
            }

            log.info("리뷰 삭제 실패");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("리뷰 삭제 실패");
        } catch (Exception e) {
            log.error("리뷰 삭제 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }
    
}
