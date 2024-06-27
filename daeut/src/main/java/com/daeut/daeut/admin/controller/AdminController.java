package com.daeut.daeut.admin.controller;

import java.util.List;
import java.util.HashMap;
import java.util.Date;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daeut.daeut.admin.service.AdminService;
import com.daeut.daeut.auth.dto.Review;
import com.daeut.daeut.auth.dto.Users;
import com.daeut.daeut.auth.service.UserService;
import com.daeut.daeut.main.dto.Page;
import com.daeut.daeut.partner.dto.Partner;
import com.daeut.daeut.reservation.dto.Cancel;
import com.daeut.daeut.reservation.dto.OrderStatus;
import com.daeut.daeut.reservation.dto.Orders;
import com.daeut.daeut.reservation.dto.PaymentStatus;
import com.daeut.daeut.reservation.dto.Payments;
import com.daeut.daeut.reservation.service.CancelService;
import com.daeut.daeut.reservation.service.OrderService;
import com.daeut.daeut.reservation.service.PaymentService;
import com.daeut.daeut.reservation.service.ReservationService;

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

    @GetMapping("/join")
    public ResponseEntity<?> join() {
        try {
            return new ResponseEntity<>("result", HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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

    @PostMapping("/join")
    public ResponseEntity<?> adminJoin(@RequestBody Users user, @RequestParam String systemPw) {
        try {
            if (userService.select(user.getUserId()) != null) {
                log.info("아이디 중복");
                return new ResponseEntity<>("result", HttpStatus.BAD_REQUEST);
            }

            adminService.adminJoin(user, systemPw);
            return new ResponseEntity<>("result", HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/adminUser")
    public ResponseEntity<?> adminUser(@RequestParam(value = "page", defaultValue = "1") int pageNumber) throws Exception {
        try {
            int total = adminService.countUsers();
            Page page = new Page(pageNumber, total);
            List<Users> userList = adminService.selectAllUsers(page);
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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

    @GetMapping("/adminUserRead/{userNo}")
    public ResponseEntity<?> adminUserRead(@PathVariable("userNo") int userNo) throws Exception {
        try {
            Users user = adminService.findUserById(userNo);
            log.info(user.toString());
            List<Review> reviews = adminService.selectReviewsByUser(userNo); // 리뷰 목록 조회 추가
            log.info("reviews" + reviews);
            HashMap<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("reviews", reviews); // 모델에 리뷰 추가
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.info("예외 발생 !!!", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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

    @DeleteMapping("/adminUserDelete/{userNo}")
    public ResponseEntity<?> adminUserDelete(@PathVariable("userNo") int userNo) throws Exception {
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

    @DeleteMapping("/adminReviewDelete/{reviewNo}")
    public ResponseEntity<?> adminReviewDelete(@PathVariable("reviewNo") int reviewNo) throws Exception {
        try {
            int result = adminService.adminDeleteReview(reviewNo);
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

    @PostMapping("/adminReservationCancel")
    public ResponseEntity<?> adminReadReservationCancel(@RequestParam("ordersNo") String ordersNo) {
        try {
            log.info("ordersNo: " + ordersNo);

            // 결제 내역 환불로 수정
            Payments payments = paymentService.selectByOrdersNo(ordersNo);
            payments.setStatus(PaymentStatus.REFUND);
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
            orders.setOrderStatus(OrderStatus.CANCELLED);
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
