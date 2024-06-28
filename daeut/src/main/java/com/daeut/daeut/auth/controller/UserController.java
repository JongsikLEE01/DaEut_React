package com.daeut.daeut.auth.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daeut.daeut.auth.dto.CustomUser;
import com.daeut.daeut.auth.dto.Review;
import com.daeut.daeut.auth.dto.Users;
import com.daeut.daeut.auth.service.ReviewService;
import com.daeut.daeut.auth.service.UserService;
import com.daeut.daeut.partner.dto.Partner;
import com.daeut.daeut.reservation.dto.Cart;
import com.daeut.daeut.reservation.dto.ChatRooms;
import com.daeut.daeut.reservation.dto.Orders;
import com.daeut.daeut.reservation.dto.Payments;
import com.daeut.daeut.reservation.service.CartService;
import com.daeut.daeut.reservation.service.ChatRoomService;
import com.daeut.daeut.reservation.service.OrderService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatRoomService chatRoomService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ReviewService reviewService;

    // 사용자 마이페이지 조회
    @GetMapping("/userMypage")
    public ResponseEntity<Users> userMypage(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        log.info("/user/userMypage");

        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(user);
    }

    // 사용자 마이페이지 수정 화면 (이 부분은 단순 조회이므로 GET 유지)
    @GetMapping("/userMypageUpdate")
    public ResponseEntity<Users> userMypageUpdate(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        log.info("/user/userMypageUpdate");

        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(user);
    }

    // 사용자 마이페이지 수정 처리
    @PutMapping("/userMypageUpdateDone")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> userMypageUpdateDone(@AuthenticationPrincipal CustomUser customUser, @RequestParam("action") String action, @RequestBody Users user) throws Exception {
        Users sessionUser = customUser.getUser();
        if (sessionUser == null) {
            // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            if ("delete".equals(action)) {
                int result = userService.delete(sessionUser);
                log.info("Delete result: " + result);
                if (result > 0) {
                    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
            } else if ("update".equals(action)) {
                int result = userService.update(user);
                log.info("Update result: " + result);
                if (result > 0) {
                    return ResponseEntity.ok().build();
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
            }
        } catch (Exception e) {
            log.error("Error updating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 사용자 예약 화면 조회
    @GetMapping("/userReservation")
    public ResponseEntity<List<Orders>> userReservation(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        log.info("/user/userReservation");

        Users user = customUser.getUser();
        if (user == null) {
            // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String userId = user.getUserId();
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        log.info(userId);

        List<Orders> orders = userService.selectOrdersByUserId(userId);

        return ResponseEntity.ok(orders);
    }

    // 사용자 예약 삭제 처리
    @DeleteMapping("/OrdersDelete")
    public ResponseEntity<Void> OrdersDelete(@RequestParam("ordersNo") String ordersNo) throws Exception {
        try {
            orderService.OrdersDelete(ordersNo);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting order", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 사용자 작성 리뷰 폼 조회
    @GetMapping("/userReview")
    public ResponseEntity<Review> showReviewForm(@AuthenticationPrincipal CustomUser customUser) {
        log.info("/user/userReview");

        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int userNo = user.getUserNo();
        List<Payments> payments = reviewService.getUserPayments(userNo);
        // model.addAttribute("payments", payments);

        // 결제 정보가 있다면 첫 번째 결제를 기본값으로 설정
        if (!payments.isEmpty()) {
            Payments firstPayment = payments.get(0);
            Review review = new Review();
            review.setPaymentNo(firstPayment.getPaymentNo());
            review.setServiceNo(firstPayment.getServiceNo());
            review.setPartnerNo(firstPayment.getPartnerNo());
            return ResponseEntity.ok(review);
        } else {
            return ResponseEntity.ok(new Review());
        }
    }

    // 리뷰 저장 처리
    @PostMapping("/userReviewDone")
    public ResponseEntity<Void> submitReview(@AuthenticationPrincipal CustomUser customUser,@RequestBody Review review) {
        log.info("/user/userReviewDone");

        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        review.setUserNo(user.getUserNo());

        Payments payment = reviewService.getPaymentDetails(review.getPaymentNo());
        if (payment == null) {
            // payment 객체가 null인 경우 처리
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        review.setServiceNo(payment.getServiceNo());
        review.setPartnerNo(payment.getPartnerNo());

        try {
            reviewService.saveReview(review);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error("Error saving review", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 유저 채팅방 생성 처리
    @PostMapping("/userChatRoom")
    public ResponseEntity<Void> createChatRoom(@RequestParam("partnerNo") int partnerNo, @AuthenticationPrincipal CustomUser customUser) throws Exception {
        ChatRooms chatRoom = new ChatRooms();
        chatRoom.setPartnerNo(partnerNo);

        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        chatRoom.setUserNo(user.getUserNo());

        try {
            chatRoomService.merge(chatRoom);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error("Error creating chat room", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 유저 채팅 내역 조회
    @GetMapping("/userChatRoom")
    public ResponseEntity<List<ChatRooms>> userChatRooms(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        int userNo = user.getUserNo();

        List<ChatRooms> chatRoomList = chatRoomService.selectByUserNo(userNo);

        return ResponseEntity.ok(chatRoomList);
    }

    // 사용자 장바구니 조회
    @GetMapping("/userCart")
    public ResponseEntity<List<Cart>> userCart(@AuthenticationPrincipal CustomUser customUser) {
        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        int userNo = user.getUserNo();

        try {
            List<Cart> cartList = cartService.cartList(userNo);
            return ResponseEntity.ok(cartList);
        } catch (Exception e) {
            log.error("Error retrieving cart", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 사용자, 파트너 신청 화면 조회
    @GetMapping("/userPartner")
    public ResponseEntity<Partner> userPartner(@AuthenticationPrincipal CustomUser customUser) throws Exception {
        log.info("/user/userPartner");

        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Partner partner = userService.selectUserAndPartnerDetails(user.getUserNo());
        // model.addAttribute("partner", partner);

        return ResponseEntity.ok(partner);
    }

    // 파트너 신청 처리
    @PostMapping("/request-partner")
    public ResponseEntity<Void> insertPartner(@RequestBody Partner partner, @AuthenticationPrincipal CustomUser customUser) throws Exception {
        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Partner partnerDetails = userService.selectUserAndPartnerDetails(user.getUserNo()); // 사용자 정보를 가져옴
        if (partnerDetails != null) {
            partner.setUserNo(partnerDetails.getUserNo());
            try {
                userService.insertPartner(partner);
                userService.updateUserStatus(partnerDetails.getUserNo());
                return ResponseEntity.status(HttpStatus.CREATED).build();
            } catch (Exception e) {
                log.error("Error inserting partner", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 파트너 신청 승인 처리
    @PostMapping("/approve-partner")
    public ResponseEntity<Void> approvePartner(@RequestParam String userId) {
        try {
            // userService.approvePartner(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error approving partner status", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 파트너 신청 완료 페이지
    @GetMapping("/userPartnerDone")
    public ResponseEntity<Void> userPartnerDone() {
        log.info("/user/userPartnerDone");
        return ResponseEntity.ok().build();
    }

    // 예약 취소 페이지 조회
    @GetMapping("/userResevationCancel")
    public ResponseEntity<Orders> userResevationCancel(@RequestParam String ordersNo) throws Exception {
        try {
            Orders orders = orderService.select(ordersNo);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            log.error("Error retrieving order for cancellation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
