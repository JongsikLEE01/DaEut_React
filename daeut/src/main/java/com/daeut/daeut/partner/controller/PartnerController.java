package com.daeut.daeut.partner.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daeut.daeut.auth.dto.Review;
import com.daeut.daeut.auth.dto.Users;
import com.daeut.daeut.auth.service.UserService;
import com.daeut.daeut.partner.dto.Partner;
import com.daeut.daeut.partner.service.PartnerService;
import com.daeut.daeut.reservation.dto.ChatRooms;
import com.daeut.daeut.reservation.dto.OrderItems;
import com.daeut.daeut.reservation.dto.Orders;

import com.daeut.daeut.reservation.dto.Payments;
import com.daeut.daeut.reservation.dto.Services;

import com.daeut.daeut.reservation.service.ChatRoomService;
import com.daeut.daeut.reservation.service.OrderItemService;
import com.daeut.daeut.reservation.service.OrderService;
import com.daeut.daeut.reservation.service.PaymentService;
import com.daeut.daeut.reservation.service.ReservationService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    @GetMapping("/{userNo}")
    public ResponseEntity<?> partnerMypage(@PathVariable("userNo") int userNo) throws Exception {
        try {
            Partner partner = partnerService.getPartners(userNo);
            return new ResponseEntity<>(partner, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 수정 처리
    @PreAuthorize("hasRole('ROLE_ADMIN') or #user.userId == authentication.name")
    @PutMapping()
    public ResponseEntity<?> partnerMypageUpdatePro(@RequestBody Users user, @RequestBody Partner partner) {
        try {
            int result = partnerService.partnerUpdate(partner, user);

            if (result > 0) {
                return ResponseEntity.ok().body("업데이트 성공");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 실패");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류 발생: " + e.getMessage());
        }
    }


    // 탈퇴 처리
    @DeleteMapping("/{userNo}")
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
    @GetMapping("/{partnerNo}")
    @Transactional
    public ResponseEntity<?> getReviewsByPartnerNo(@RequestParam("partnerNo") Integer partnerNo) {
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

    // 파트너 예약란
    @GetMapping("/{partnerNo}/reservation")
    public String partnerReservation(Model model, HttpSession session) throws Exception {
        int partnerNo = (int) session.getAttribute("partnerNo"); // 세션에서 partnerNo 가져오기
        List<Orders> orderList = orderService.listByPartnerNo(partnerNo); // 주문 목록 가져오기
        
        for (Orders orders : orderList) {
            Payments payments = paymentService.selectByOrdersNo(orders.getOrdersNo());
            model.addAttribute("payments", payments);
        }
        model.addAttribute("orderList", orderList); // 모델에 주문 목록 추가
        return "/partner/partnerReservation";  
    }

    // 파트너 예약 상세조회란 
    @GetMapping("/{ordersNo}")
    public ResponseEntity<?> partnerReservationRead(@PathVariable("ordersNo") String ordersNo) {
        try {
            // 주문에 대한 상세 정보를 조회
            Orders order = orderService.listByOrderNo(ordersNo);
            Payments payments = paymentService.selectByOrdersNo(ordersNo);
            List<OrderItems> orderItemList = orderItemService.listByOrderNo(ordersNo);

            // 서비스 정보를 담을 맵
            Map<String, Object> response = new HashMap<>();
            response.put("order", order);
            response.put("payments", payments);

            for (OrderItems orderItems : orderItemList) {
                Services service = reservationService.select(orderItems.getServiceNo());
                response.put("service_" + orderItems.getServiceNo(), service);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception occurred: " + e.getMessage());
        }
    }

    
    @GetMapping("/partnerChatRoom")
    public String userChatRooms(Model model, HttpSession session) throws Exception {
        int partnerNo = (int) session.getAttribute("partnerNo"); // 세션에서 partnerNo 가져오기
        
        log.info("pNo {}"+partnerNo);

        // 파트너 번호로 채팅 내역 가져오기
        List<ChatRooms> chatRoomList = chatRoomService.selectByPartnerNo(partnerNo);
        // for (ChatRooms chatRooms : chatRoomList) {
        //     String roomNo = chatRooms.getRoomNo();
        //     model.addAttribute("roomNo", roomNo);
        // }
        
        model.addAttribute("chatRoomList", chatRoomList);
        return "partner/partnerChatRoom";
    }
}
