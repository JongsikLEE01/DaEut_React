package com.daeut.daeut.reservation.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;


import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daeut.daeut.auth.dto.Review;
import com.daeut.daeut.auth.dto.Users;
import com.daeut.daeut.auth.service.ReviewService;
import com.daeut.daeut.auth.service.UserService;
import com.daeut.daeut.main.dto.Files;
import com.daeut.daeut.main.dto.Option;
import com.daeut.daeut.main.dto.ServicePage;
import com.daeut.daeut.main.service.FileService;
import com.daeut.daeut.partner.dto.Partner;
import com.daeut.daeut.partner.service.PartnerService;
import com.daeut.daeut.reservation.dto.Services;
import com.daeut.daeut.reservation.service.ReservationService;

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
    public ResponseEntity<List<Services>> getAllServices(ServicePage servicePage, Option option) {
        try {
            String keyword = option.getKeyword();
            if (keyword == null || keyword.isEmpty()) {
                keyword = "";
                option.setKeyword(keyword);
            }
            List<Services> serviceList = reservationService.serviceList(servicePage, option);
            return ResponseEntity.ok().body(serviceList);
        } catch (Exception e) {
            log.error("Error fetching services: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
    public ResponseEntity<Map<String, Object>> reservationRead(@PathVariable("serviceNo") int serviceNo, HttpSession session) {
        try {
            Services service = reservationService.serviceSelect(serviceNo);
            Files thumbnail = reservationService.SelectThumbnail(serviceNo);
            List<Files> files = reservationService.SelectFiles(serviceNo);
            Users user = (Users) session.getAttribute("user");
            List<Review> reviews = reviewService.getReviewByServiceNo(serviceNo);

            // partner_no를 service 객체에서 가져옵니다.
            int partnerNo = service.getPartnerNo();
            Partner partner = partnerService.selectByPartnerNo(partnerNo);
            Users pUsers = userService.findUserById(partner.getUserNo());
            Files pthumbnail = reservationService.partnerThumbnail(partnerNo);
            Files rFiles = reservationService.getFileByServiceNum(serviceNo);

            Files file = new Files();
            file.setParentTable("service");
            file.setParentNo(serviceNo);
            List<Files> fileList = fileService.listByParent(file);
            
            int averageRating = reviewService.getAverageRatingByServiceNo(serviceNo);

            // Response 맵 구성
            Map<String, Object> response = new HashMap<>();
            response.put("serviceNo", serviceNo);
            response.put("service", service);
            response.put("fileList", fileList);
            response.put("thumbnail", thumbnail);
            response.put("files", files);
            response.put("user", user);
            response.put("reviews", reviews);
            response.put("partner", partner);
            response.put("pUsers", pUsers);
            response.put("averageRating", averageRating);
            response.put("pthumbnail", pthumbnail);
            response.put("rFiles", rFiles);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

	/**
     * 글 등록 
     * @write jslee
     * @return
     */
	// @GetMapping("/reservationInsert")
	// public String moveToReservationInsert(HttpSession session, Model model) {
    //     int partnerNo = (int) session.getAttribute("partnerNo");

    //     model.addAttribute("partnerNo", partnerNo);
	// 	return "reservation/reservationInsert";
	// }

    /**
     * 서비스 등록
     * @write jslee
     * @param service
     * @param session
     * @return
     */
    @PostMapping("")
    public ResponseEntity<String> reservationInsert(@RequestBody Services service, HttpSession session) {
        try {
            int result = reservationService.serviceInsert(service);

            if (result == 0) {
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
     * 글 수정
     * @write jslee
     * @param serviceNo
     * @param model
     * @param file
     * @return
     * @throws Exception
     */
    @GetMapping("/update")
    public ResponseEntity<Map<String, Object>> reservationUpdate(@RequestParam("serviceNo") int serviceNo) {
        try {
            Services service = reservationService.serviceSelect(serviceNo);
            Files thumbnail = reservationService.SelectThumbnail(serviceNo);
            List<Files> files = reservationService.SelectFiles(serviceNo);
            
            Files file = new Files();
            file.setParentTable("service");
            file.setParentNo(serviceNo);
            List<Files> fileList = fileService.listByParent(file);
            
            Map<String, Object> response = new HashMap<>();
            response.put("service", service);
            response.put("fileList", fileList);
            response.put("thumbnail", thumbnail);
            response.put("files", files);
            
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    /**
     * 수정처리
     * @param service
     * @return
     * @throws Exception
     */
    @PutMapping("")
    public ResponseEntity<String> updatePro(@RequestBody Services service) {
        try {
            // int partnerNo = (int) session.getAttribute("partnerNo");
            // service.setPartnerNo(partnerNo);

            Files file = new Files();
            file.setParentTable("service");
            file.setParentNo(service.getServiceNo());
            fileService.deleteByParent(file);

            int result = reservationService.serviceUpdate(service);
            int serviceNo = service.getServiceNo();

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

    // @GetMapping("/paymentDone")
    // public String paymentDone() {
    //     return "reservation/paymentDone";
    // }
    
    // @GetMapping("/paymentFalse")
    // public String paymentFalse() {
    //     return "reservation/paymentFalse";
    // }

 
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
