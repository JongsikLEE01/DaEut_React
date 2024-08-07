package com.aloha.server.partner.controller;

import java.util.List;
import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.auth.dto.Review;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.auth.service.UserService;
import com.aloha.server.partner.dto.Partner;
import com.aloha.server.partner.service.PartnerService;
import com.aloha.server.reservation.dto.ChatRooms;
import com.aloha.server.reservation.dto.OrderItems;
import com.aloha.server.reservation.dto.Orders;
import com.aloha.server.reservation.dto.Payments;
import com.aloha.server.reservation.dto.Services;
import com.aloha.server.reservation.service.ChatRoomService;
import com.aloha.server.reservation.service.OrderItemService;
import com.aloha.server.reservation.service.OrderService;
import com.aloha.server.reservation.service.PaymentService;
import com.aloha.server.reservation.service.ReservationService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Map;
import java.util.HashMap;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/partner")
public class PartnerController {

    @Autowired
    private PartnerService partnerService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ChatRoomService chatRoomService;

    
    
    // 마이페이지 정보 조회
    @GetMapping("/partnerMypage/{userNo}")
    public ResponseEntity<?> partnerMypage(@PathVariable("userNo") int userNo) throws Exception {
        try {
            Partner partner = partnerService.getPartners(userNo);
            return new ResponseEntity<>(partner, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 수정 처리
    @PutMapping("/update/{userNo}")
    public ResponseEntity<?> updatePartner(@PathVariable("userNo") Long userNo,
                                           @RequestBody Partner partner) {
        try {
            log.info("Updating partner information for user with userNo: {}", userNo);

            // Long을 int로 변환
            int userNoInt = userNo.intValue();

            // UserService에서 유저 정보 업데이트
            Users user = userService.selectByUserNo(userNoInt);
            userService.update(user);

            // Partner 정보 업데이트
            int result = partnerService.partnerUpdate(partner);

            if (result > 0) {
                log.info("Partner information updated successfully");
                return ResponseEntity.ok().build();
            } else {
                log.error("Failed to update partner information");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception e) {
            log.error("Exception occurred while updating partner information", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    // @PostMapping("/partnerMypageUpdatePro")
    // public String partnerMypageUpdatePro(Model model, HttpSession session, @ModelAttribute("user") Users user, @ModelAttribute("partner") Partner partner) throws Exception {
    //     int result = partnerService.partnerUpdate(partner, user);
    
    //     if (result > 0) {
    //         return "redirect:/partner/partnerMypage";
    //     } else {
    //         return "redirect:/index";
    //     }
    // }

    // @PutMapping("")
    // public ResponseEntity<?> update(@RequestBody Users user) throws Exception {
    //     log.info("[PUT] - /users");
    //     int result = userService.update(user);

    //     if( result > 0 ) {
    //         log.info("회원수정 성공! - SUCCESS");
    //         return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    //     }
    //     else {
    //         log.info("회원수정 실패! - FAIL");
    //         return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    //     } 
    // }


    // 탈퇴 처리
    @DeleteMapping("/delete/{userNo}")
    public ResponseEntity<?> deleteUser(@RequestParam("userNo") int userNo, @RequestParam("userId") String userId) {
        try {
            // 사용자 삭제 처리
            Users user = new Users();
            user.setUserNo(userNo);
            user.setUserId(userId);
            int result = userService.delete(user);

            // 로그아웃 처리
            if (result > 0) {
                // SecurityContextHolder를 사용하여 현재 사용자의 인증 정보를 제거
                SecurityContextHolder.clearContext();
                return ResponseEntity.ok("User deleted successfully"); // 회원 탈퇴 및 로그아웃 성공
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user"); // 회원 탈퇴 중 오류 발생
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception occurred: " + e.getMessage()); // 예외 발생 시
        }
    }

    // 파트너 리뷰란
    @GetMapping("/reviews/{partnerNo}")
    public ResponseEntity<?> getReviewsByPartnerNo(@PathVariable("partnerNo") Integer partnerNo) {
        log.info("왜안나와");
        try {
            if (partnerNo == null) {
                log.error("PartnerNo is missing in request");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("PartnerNo is missing in request");
            }
            List<Review> reviews = partnerService.getReviews(partnerNo);
            // Add reviews to the log
            log.info("Reviews retrieved: {}", reviews);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            log.error("Error in getReviewsByPartnerNo method", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception occurred: " + e.getMessage());
        }
    }
    
        // 파트너 예약 조회
        @GetMapping("/reservations/{partnerNo}")
        public ResponseEntity<?> partnerReservation(@PathVariable("partnerNo") Integer partnerNo) {
            log.info("Fetching reservations for partnerNo: {}", partnerNo);
            try {
                if (partnerNo == null) {
                    log.error("PartnerNo is missing in request");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("PartnerNo is missing in request");
                }
        
                List<Orders> orderList = orderService.listByPartnerNo(partnerNo); // 주문 목록 가져오기
                
                List<Payments> paymentsList = new ArrayList<>();
                for (Orders orders : orderList) {
                    Payments payments = paymentService.selectByOrdersNo(orders.getOrdersNo());
                    paymentsList.add(payments);
                }
        
                Map<String, Object> response = new HashMap<>();
                response.put("orderList", orderList);
                response.put("paymentsList", paymentsList);
        
                log.info("Reservations and payments retrieved: {}", response);
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                log.error("Error in partnerReservation method", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception occurred: " + e.getMessage());
            }
        }
    
    // 파트너 예약 상세조회란 
        @GetMapping("/reservationRead/{ordersNo}")
        public ResponseEntity<?> partnerReservationRead(@PathVariable("ordersNo") String ordersNo) {
            try {
                Orders order = orderService.listByOrderNo(ordersNo);
                if (order == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found for ordersNo: " + ordersNo);
                }
        
                Payments payments = paymentService.selectByOrdersNo(ordersNo);
                List<OrderItems> orderItemList = orderItemService.listByOrderNo(ordersNo);
        
                Map<String, Object> response = new HashMap<>();
                response.put("order", order);
                response.put("payments", payments);
        
                for (OrderItems orderItems : orderItemList) {
                    Services service = reservationService.select(orderItems.getServiceNo());
                    if (service != null) {
                        response.put("service_" + orderItems.getServiceNo(), service);
                    }
                }
        
                log.info("예약 상세 페이지 {}", response);
                return ResponseEntity.ok(response);
            } catch (Exception e) {
                log.error("Exception occurred while fetching partner reservation details for ordersNo: {}", ordersNo, e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception occurred: " + e.getMessage());
            }
        }
    
        // 파트너 채팅방
        @GetMapping("/partnerChatRoom")
        public ResponseEntity<?> userChatRooms(@RequestParam int partnerNo){
            log.info("pNo {}"+partnerNo);
            try {
                List<ChatRooms> chatRoomList = chatRoomService.selectByPartnerNo(partnerNo);
        
                log.info("파트너 채팅 내역 {}", chatRoomList);
                return ResponseEntity.ok(chatRoomList);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파트너 채팅 내역 조회 중 에러 발생... " + e.getMessage());
            }
        }
        
}
