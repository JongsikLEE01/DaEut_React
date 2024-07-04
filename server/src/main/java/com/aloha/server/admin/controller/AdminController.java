package com.aloha.server.admin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.admin.service.AdminService;
import com.aloha.server.auth.dto.CustomUser;
import com.aloha.server.auth.dto.Review;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.auth.service.UserService;
import com.aloha.server.main.dto.Page;
import com.aloha.server.partner.dto.Partner;
import com.aloha.server.partner.service.PartnerService;
import com.aloha.server.reservation.dto.Cancel;
import com.aloha.server.reservation.dto.OrderStatus;
import com.aloha.server.reservation.dto.Orders;
import com.aloha.server.reservation.dto.PaymentStatus;
import com.aloha.server.reservation.dto.Payments;
import com.aloha.server.reservation.service.CancelService;
import com.aloha.server.reservation.service.OrderService;
import com.aloha.server.reservation.service.PaymentService;
import com.aloha.server.reservation.service.ReservationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {

    @Value("${system.pw}")
    private String systemPw;

    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CancelService cancelService;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private PartnerService partnerService;

    // 회원가입 화면
    @GetMapping("/join")
    public ResponseEntity<?> join() {
        try {
            return new ResponseEntity<>("회원가입 화면", HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 아이디 중복 확인
    @GetMapping("/check-duplicate")
    public ResponseEntity<?> checkDuplicateId(@RequestParam String userId) throws Exception {
        try {
            Users user = userService.select(userId);
            boolean exists = user != null;
            return new ResponseEntity<>(exists, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 이메일 중복 확인
    @GetMapping("/check-duplicate-email")
    public ResponseEntity<?> checkDuplicateEmail(@RequestParam String userEmail) throws Exception {
        try {
            Users user = userService.findUserByEmail(userEmail);
            boolean exists = user != null;
            return new ResponseEntity<>(exists, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 회원가입 처리
    @PostMapping("/join")
    public ResponseEntity<Map<String, String>> adminJoin(@RequestBody Users user, @RequestParam String systemPw) {
        Map<String, String> response = new HashMap<>();
        try {
            if (!this.systemPw.equals(systemPw)) { // systemPw 필드는 클래스 변수로 정의되어 있어야 합니다.
                log.info("시스템 비밀번호 불일치");
                response.put("status", "SYSTEM_PW_INCORRECT");
                response.put("message", "시스템 비밀번호가 일치하지 않습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            // Users existingUser = userService.select(user.getUserId());
            // if (existingUser != null) {
            //     log.info("아이디 중복");
            //     response.put("status", "USER_ID_DUPLICATE");
            //     response.put("message", "아이디가 중복되었습니다.");
            //     return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            // }

            adminService.adminJoin(user, systemPw); // adminService에서 회원 가입 로직을 처리하는 메서드 호출

            response.put("status", "SUCCESS");
            response.put("message", "회원가입 성공");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("회원가입 중 예외 발생 !!!", e);
            response.put("status", "ERROR");
            response.put("message", "회원가입 중 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }






    // 회원가입 완료
    @GetMapping("/joinDone")
    public ResponseEntity<?> joinDone() {
        Map<String, String> response = new HashMap<>();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    
    // 관리자 - 회원 목록
    @GetMapping("/adminUser")
    public ResponseEntity<?> adminUser(@RequestParam(value = "page", defaultValue = "1") int pageNumber, @AuthenticationPrincipal CustomUser customUser) throws Exception {
        
        Users user = customUser.getUser();
        log.info("user : " + user);

        // 인증된 사용자 정보
        if (user == null) {
            return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }

        try {
            int total = adminService.countUsers();
            Page page = new Page(pageNumber, total);
            List<Users> userList = adminService.selectAllUsers(page);

            for (Users u : userList) {
                Partner partner = partnerService.findByUserNo(u.getUserNo());
                if (partner != null) {
                    u.setPartnerNo(partner.getPartnerNo());
                }
            }

            Map<String, Object> response = new HashMap<>();
            response.put("userList", userList);
            response.put("totalCount", total);
            response.put("currentPage", pageNumber);
            // response.put("pageSize", page.getPageSize());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    // 관리자 - 파트너 목록
    @GetMapping("/adminPartner")
    public ResponseEntity<?> adminPartner(@RequestParam(value = "page", defaultValue = "1") int pageNumber) throws Exception {
        try {
            int total = adminService.countPartners();
            Page page = new Page(pageNumber, total);
            List<Partner> partnerList = adminService.selectAllPartners(page);
            return new ResponseEntity<>(partnerList, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 회원, 리뷰 조회
    @GetMapping("/adminUserRead/{userNo}")
    public ResponseEntity<?> adminUserRead(@PathVariable("userNo") int userNo) throws Exception {
        try {
            Users user = adminService.findUserById(userNo);
            log.info(user.toString());
            List<Review> reviews = adminService.selectReviewsByUser(userNo); // 리뷰 목록 조회 추가
            log.info("reviews: " + reviews);
            HashMap<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("reviews", reviews); // 모델에 리뷰 추가
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 회원, 리뷰 수정 화면
    @GetMapping("/adminUserUpdate/{userNo}")
    public ResponseEntity<?> adminUserUpdate(@PathVariable("userNo") int userNo) throws Exception {
        try {
            Users user = adminService.findUserById(userNo);
            List<Review> reviews = adminService.selectReviewsByUser(userNo); // 리뷰 목록 조회 추가
            log.info("업데이트 화면이동...");
            log.info(user.toString());

            HashMap<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("reviews", reviews); // 모델에 리뷰 추가

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 회원 수정 처리
    @PutMapping("/adminUserUpdate/{userNo}")
    public ResponseEntity<?> adminUserUpdatePro(@PathVariable("userNo") int userNo, @RequestBody Users user) throws Exception {
        try {
            int result = adminService.adminUpdateUser(user);
            log.info("회원 수정 중.....");
            if (result > 0) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 회원 삭제 처리
    @DeleteMapping("/adminUserDelete")
    public ResponseEntity<?> adminUserDelete(@RequestParam("userNo") int userNo) throws Exception {
        try {
            int result = adminService.adminDeleteUser(userNo);
            if (result > 0) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 리뷰 삭제 처리
    @DeleteMapping("/adminReviewDelete/{reviewNo}")
    public ResponseEntity<?> adminReviewDelete(@PathVariable("reviewNo") int reviewNo) throws Exception {
        log.info("reviewNo : " + reviewNo);
        try {
            int result = adminService.adminDeleteReview(reviewNo);
            log.info("review 삭제 : " + result);

                return new ResponseEntity<>(result, HttpStatus.OK);
            
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 파트너 조회 화면
    @GetMapping("/adminPartnerRead/{userNo}")
    public ResponseEntity<?> adminPartnerRead(@PathVariable("userNo") int userNo) throws Exception {
        try {
            Partner partner = adminService.findPartnerById(userNo);
            log.info(partner.toString());
            return new ResponseEntity<>(partner, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 파트너 승인 처리
    @PostMapping("/approvePartner/{userId}")
    public ResponseEntity<?> approvePartner(@PathVariable("userId") String userId) {
        try {
            log.info("파트너 아이디: " + userId);
            adminService.approvePartner(userId);
            adminService.insertPartnerAuth(userId);
            return new ResponseEntity<>("파트너 승인이 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 파트너 승인 취소 처리
    @PostMapping("/cancelPartner/{userId}")
    public ResponseEntity<?> cancelPartner(@PathVariable("userId") String userId) {
        try {
            log.info("파트너 아이디: " + userId);
            adminService.cancelPartner(userId);
            adminService.deletePartnerAuth(userId);
            return new ResponseEntity<>("파트너 승인이 취소되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 파트너 수정 화면 
    @GetMapping("/adminPartnerUpdate/{userNo}")
    public ResponseEntity<?> adminPartnerUpdate(@PathVariable("userNo") int userNo) throws Exception {
        try {
            Partner partner = adminService.findPartnerById(userNo);
            log.info(partner.toString());
            return new ResponseEntity<>(partner, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 파트너 수정 처리
    @PutMapping("/adminPartnerUpdate/{userNo}")
    public ResponseEntity<?> adminPartnerUpdatePro(@PathVariable("userNo") int userNo, @RequestBody Partner partner) throws Exception {
        try {
            int result = adminService.adminUpdatePartner(partner);
            log.info("파트너 수정 중..... result: " + result);
            if (result > 0) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 파트너 삭제 처리
    @DeleteMapping("/adminPartnerDelete/{userNo}")
    public ResponseEntity<?> adminPartnerDelete(@PathVariable("userNo") int userNo) throws Exception {
        try {
            int result = adminService.adminDeletePartner(userNo);
            if (result > 0) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 회원 선택 삭제
    @PostMapping("/user/delete")
    public ResponseEntity<?> selectedUserDelete(@RequestBody String[] deleteNoList) throws Exception {
        try {
            log.info("선택한 유저 번호들:");
            for (String no : deleteNoList) {
                log.info("no  : " + no);
            }
            int result = adminService.deleteList(deleteNoList);
            log.info("삭제된 회원 수 : " + result);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            log.error("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 파트너 선택 삭제
    @PostMapping("/partner/delete")
    public ResponseEntity<?> selectedPartnerDelete(@RequestBody String[] deleteNoList) throws Exception {
        try {
            log.info("선택한 유저 번호들:");
            for (String no : deleteNoList) {
                log.info("no  : " + no);
            }
            int result = adminService.deleteList(deleteNoList);
            log.info("삭제된 회원 수 : " + result);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 예약 목록 화면
    @GetMapping("/adminReservation")
    public ResponseEntity<?> selectReservations(@RequestParam(value = "page", defaultValue = "1") int pageNumber) throws Exception {
        try {
            int total = adminService.countReservations();
            Page page = new Page(pageNumber, total);
            List<Orders> orderList = adminService.list(page);
            log.info("--------------------------orderList " + orderList);
            return new ResponseEntity<>(orderList, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 예약 조회 화면
    @GetMapping("/adminReservationRead")
    public ResponseEntity<?> adminReadReservation(@RequestParam("ordersNo") String ordersNo) {
        try {
            log.info("ordersNo : " + ordersNo);
            Payments payments = paymentService.selectByOrdersNo(ordersNo);
            log.info("payments?? : " + payments);
            Orders orders = orderService.listByOrderNo(ordersNo);
            log.info("orders : " + orders);
            Users user = userService.selectByUserNo(orders.getUserNo());
            log.info("user : " + user);
            Cancel cancel = cancelService.selectByOrdersNo(ordersNo);

            HashMap<String, Object> response = new HashMap<>();
            response.put("cancel", cancel);
            response.put("user", user);
            response.put("payments", payments);
            response.put("orders", orders);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 환불
     * @param ordersNo
     * @return
     */
    @PostMapping("/adminReservationCancel")
    public ResponseEntity<?> adminReadReservationCancel(@RequestParam("ordersNo") String ordersNo) {
        try {
            log.info("ordersNo: " + ordersNo);

            // 결제 내역 환불로 수정
            Payments payments = paymentService.selectByOrdersNo(ordersNo);
            payments.setStatus(PaymentStatus.환불);
            log.info("payments: " + payments);
            paymentService.merge(payments);

            // 취소 내역 환불로 승인
            Cancel cancel = cancelService.selectByOrdersNo(ordersNo);
            cancel.setConfirmed(1);
            cancel.setRefund(1);
            log.info("cancel: " + cancel);
            cancelService.update(cancel);

            // 주문 내역 환불로 수정
            Orders orders = orderService.select(ordersNo);
            orders.setOrderStatus(OrderStatus.환불);
            log.info("orders: " + orders);
            orderService.update(orders);

            HashMap<String, Object> response = new HashMap<>();
            response.put("payments", payments);
            response.put("cancel", cancel);
            response.put("orders", orders);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 관리자 - 예약 수정 화면
    @GetMapping("/adminReservationUpdate")
    public ResponseEntity<?> adminReservationUpdate(@RequestParam("ordersNo") String ordersNo) throws Exception {
        try {
            Payments payments = paymentService.selectByOrdersNo(ordersNo);
            Orders orders = orderService.listByOrderNo(ordersNo);
            Users user = userService.selectByUserNo(orders.getUserNo());

            HashMap<String, Object> response = new HashMap<>();
            response.put("payments", payments);
            response.put("orders", orders);
            response.put("user", user);

            log.info(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::" + orders);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 예약 수정
     * @param userNo
     * @param ordersNo
     * @param userName
     * @param title
     * @param totalPrice
     * @param serviceAddress
     * @param serviceDay
     * @param serviceTime
     * @return
     */
    @PutMapping("/adminReservationUpdate")
    public ResponseEntity<?> adminUpdateReservation(@RequestParam("userNo") int userNo,
                                            @RequestParam("ordersNo") String ordersNo,
                                            @RequestParam("userName") String userName,
                                            @RequestParam("title") String title,
                                            @RequestParam("totalPrice") int totalPrice,
                                            @RequestParam("serviceAddress") String serviceAddress,
                                            @RequestParam(value = "serviceDay", required = false) String serviceDay,
                                            @RequestParam(value = "serviceTime", required = false) String serviceTime) {
    try {
            Orders orders = orderService.select(ordersNo);
            orders.setUserNo(userNo);
            orders.setTitle(title);
            orders.setTotalPrice(totalPrice);
            log.info("orders: {}", orders);

            Payments payments = paymentService.selectByOrdersNo(ordersNo);
            payments.setServiceAddress(serviceAddress);
            log.info("payments: {}", payments);

            Users user = userService.selectByUserNo(userNo);
            log.info("user: {}", user);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

            // 날짜 null 처리
            if (serviceDay == null || serviceDay.isEmpty() || serviceTime == null || serviceTime.isEmpty()) {
                Date now = new Date();
                payments.setServiceDate(now);
            } else {
                String serviceDate = serviceDay + ' ' + serviceTime;
                Date orderServiceDate = sdf.parse(serviceDate);
                payments.setServiceDate(orderServiceDate);
            }

            int result = adminService.adminUpdateReservation(orders, payments, user);
            log.info("예약 수정 결과: {}", result);
            if (result > 0) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.error("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
