package com.aloha.server.auth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.auth.dto.CustomUser;
import com.aloha.server.auth.dto.Review;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.auth.service.ReviewService;
import com.aloha.server.auth.service.UserService;
import com.aloha.server.partner.dto.Partner;
import com.aloha.server.reservation.dto.Cancel;
import com.aloha.server.reservation.dto.Cart;
import com.aloha.server.reservation.dto.ChatRooms;
import com.aloha.server.reservation.dto.Orders;
import com.aloha.server.reservation.dto.Payments;
import com.aloha.server.reservation.service.CancelService;
import com.aloha.server.reservation.service.CartService;
import com.aloha.server.reservation.service.ChatRoomService;
import com.aloha.server.reservation.service.OrderService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
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

    @Autowired
    private CancelService cancelService;

//    // 사용자 마이페이지 조회
//    @GetMapping("/userMypage/{userId}")
//     @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
//     public ResponseEntity<?> userMypage(@AuthenticationPrincipal CustomUser customUser,@PathVariable("userId") String userId) throws Exception {

//     Users user = customUser.getUser();
//     log.info("user넘어와주라 : " + user);

//     Users userList = userService.select(userId);
//     log.info("userList : " + userList);
//     if (user == null) {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//     }

//     // Map<String, Object> response = new HashMap<>();
//     // response.put("user", user);
//     // response.put("additionalInfo", "Some additional info");

//     return ResponseEntity.ok(userList);
//  }
    @GetMapping("/userMypage")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
    public ResponseEntity<?> userMypage(@AuthenticationPrincipal CustomUser customUser) throws Exception {
    log.info("/user/userMypage");

    String userId = customUser.getUsername();
    // log.info("user넘어와주라 : " + userId);
    Users fullUserDetails = userService.select(userId);
    // log.info("Fetched full user details: " + fullUserDetails);

    if (fullUserDetails == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    return ResponseEntity.ok(fullUserDetails);
}

    // 사용자 마이페이지 수정 화면 (이 부분은 단순 조회이므로 GET 유지)
    @GetMapping("/userMypageUpdate")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
    public ResponseEntity<Map<String, Object>> showReviewForm(@AuthenticationPrincipal CustomUser customUser) {
        log.info("/user/userReview");

        Users user = customUser.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int userNo = user.getUserNo();
        List<Payments> payments = reviewService.getUserPayments(userNo);
        // model.addAttribute("payments", payments);

        Map<String, Object> response = new HashMap<>();
        response.put("payments", payments);

        // 결제 정보가 있다면 첫 번째 결제를 기본값으로 설정
        if (!payments.isEmpty()) {
            Payments firstPayment = payments.get(0);
            Review review = new Review();
            review.setPaymentNo(firstPayment.getPaymentNo());
            review.setServiceNo(firstPayment.getServiceNo());
            review.setPartnerNo(firstPayment.getPartnerNo());
            review.setServiceName(firstPayment.getServiceName());
            response.put("review", review);
        } else {
            response.put("review", new Review());
        }
        return ResponseEntity.ok(response);
    }

    // 리뷰 저장 처리
    @PostMapping("/userReviewDone")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
    public ResponseEntity<Void> submitReview(@AuthenticationPrincipal CustomUser customUser, 
                                            @RequestPart("review") Review review, 
                                            @RequestPart("files") MultipartFile[] files
                                            ) {
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
            reviewService.saveReview(review, files);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error("Error saving review", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 유저 채팅방 생성 처리
    @PostMapping("/userChatRoom/{partnerNo}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
    public ResponseEntity<Void> createChatRoom(@PathVariable int partnerNo, @AuthenticationPrincipal CustomUser customUser) throws Exception {
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
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
    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
    public ResponseEntity<Void> userPartnerDone() {
        log.info("/user/userPartnerDone");
        return ResponseEntity.ok().build();
    }

    // 예약 취소 페이지 조회
    @PostMapping("/cancelDone")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') or hasRole('ROLE_PARTNER')")
    public ResponseEntity<?> userResevationCancel(@RequestParam String ordersNo) throws Exception {
        try {
            Cancel cancel = cancelService.selectByOrdersNo(ordersNo);
            return ResponseEntity.ok().body(cancel);
        } catch (Exception e) {
            log.error("Error retrieving order for cancellation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
