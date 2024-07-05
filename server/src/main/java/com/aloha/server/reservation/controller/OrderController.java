package com.aloha.server.reservation.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.auth.dto.Users;
import com.aloha.server.reservation.dto.Cancel;
import com.aloha.server.reservation.dto.OrderItems;
import com.aloha.server.reservation.dto.OrderStatus;
import com.aloha.server.reservation.dto.Orders;
import com.aloha.server.reservation.dto.PaymentStatus;
import com.aloha.server.reservation.dto.Payments;
import com.aloha.server.reservation.service.CancelService;
import com.aloha.server.reservation.service.CartService;
import com.aloha.server.reservation.service.OrderItemService;
import com.aloha.server.reservation.service.OrderService;
import com.aloha.server.reservation.service.PaymentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private CartService cartService;

    @Autowired
    private CancelService cancelService;

    /**
     * 주문 등록
     * @param param
     * @return
     */
    @PostMapping("")
    public ResponseEntity<?> orderPost(@RequestBody Orders orders) {
        try {
            log.info("::::::::: 주문 등록 - orderPost() ::::::::::");
            log.info("serviceNo : " + orders.getServiceNo());
            log.info("quantity : " + orders.getQuantity());
            log.info("orders : " + orders);

            // Users user = (Users) session.getAttribute("user");
            // orders.setUserNo(user.getUserNo());
            orders.setOrderStatus(OrderStatus.보류중);
            
            // 주문 등록
            int result = orderService.insert(orders);
            
            log.info("신규 등록된 주문ID : " + orders.getOrdersNo());
            String ordersNo = orders.getOrdersNo();

            Map<String, Object> response = new HashMap<>();
            response.put("orders", orders);
            response.put("ordersNo", ordersNo);
            
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            log.error("주문 등록 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    // /**
    //  * 장바구니 주문 등록
    //  * @param orders
    //  * @param session
    //  * @param serviceNo
    //  * @param quantity
    //  * @return
    //  */
    // @PostMapping("/selected")
    // public ResponseEntity<String> orderPost(
    //                                     @RequestBody Orders orders,
    //                                     @RequestParam List<String> serviceNo,
    //                                     @RequestParam List<Integer> quantity) throws Exception {

    //     log.info("::::::::: 주문 등록 - orderPost() ::::::::::");
    //     log.info("serviceNo : " + serviceNo);
    //     log.info("quantity : " + quantity);

    //     // orders.setUserNo(user.getUserNo());
    //     orders.setOrderStatus(OrderStatus.보류중);

    //     // 주문 등록
    //     int result = orderService.insert(orders);

    //     log.info("신규 등록된 주문ID : " + orders.getOrdersNo());
    //     if (result > 0) {
    //         // 주문 등록 성공
    //         return ResponseEntity.status(HttpStatus.CREATED).body("주문 성공...");
    //     } else {
    //         // 주문 실패
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 중 오류 발생...");
    //     }
    // }
    
    /**
     * 주문 완료
     * @param model
     * @param session
     * @param ordersId
     * @return
     * @throws Exception 
     */
    @GetMapping("/success")
    public ResponseEntity<Object> orderSuccess(@RequestParam("ordersNo") String ordersNo,
                                               @RequestParam("date") String date,
                                               @RequestParam("time") String time,
                                               @RequestParam("userAddress") String userAddress,
                                               @RequestParam("userPost") String userPost
                                               ) {
        log.info("ordersNo? {}", ordersNo);
        log.info("date? {}", date);
        log.info("time? {}", time);
        log.info("userAddress? {}", userAddress);
        log.info("userPost? {}", userPost);
        try {
            Payments payments = new Payments();
            payments.setOrdersNo(ordersNo);
            payments.setPaymentMethod("card");
            payments.setStatus(PaymentStatus.결제완료);

            // 예약 날짜 가져오기
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String dateTime = date + ' ' + time;
            Date serviceDate = sdf.parse(dateTime);
            payments.setServiceDate(serviceDate);

            // 주소 저장
            String address = "(" + userPost + ") " + userAddress;
            payments.setServiceAddress(address);

            paymentService.merge(payments);

            payments = paymentService.selectByOrdersNo(ordersNo);
            log.info(":::::::::::::::::::: payments ::::::::::::::::::::");
            log.info(payments.toString());

            Orders order = orderService.select(ordersNo);
            log.info(":::::::::::::::::::: orders ::::::::::::::::::::");
            order.setOrderStatus(OrderStatus.확정완료);
            orderService.update(order);
            log.info(payments.toString());

            // 주문 성공 시 장바구니 삭제
            List<OrderItems> orderItemList = orderItemService.listByOrderNo(ordersNo);
            List<Integer> serviceNoList = new ArrayList<>();
            for (OrderItems orderItem : orderItemList) {
                serviceNoList.add(orderItem.getServiceNo());
            }
            int result = cartService.deleteByOrderComplete(serviceNoList, order.getUserNo());
            log.info("주문한 서비스 장바구니 삭제 - result : " + result);

            // JSON 응답 데이터 구성
            Map<String, Object> response = new HashMap<>();
            response.put("payments", payments);
            response.put("order", order);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            log.error("주문 처리 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류 발생");
        }
    }

    /**
     * 주문 실패 
     * @param model
     * @param session
     * @param ordersId
     * @return
     * @throws Exception 
     */
    @GetMapping("/fail")
    public ResponseEntity<Object> orderFail(@RequestParam("ordersNo") String ordersNo,
                                            @RequestParam(value = "date", required = false) String date,
                                            @RequestParam(value = "time", required = false) String time,
                                            @RequestParam(value = "userAddress", required = false) String userAddress,
                                            @RequestParam(value = "userPost", required = false) String userPost,
                                            @RequestParam(value = "errorMsg", required = false) String errorMsg
                                            ) {
        log.info("ordersNo? {}", ordersNo);
        log.info("date? {}", date);
        log.info("time? {}", time);
        log.info("userAddress? {}", userAddress);
        log.info("userPost? {}", userPost);
        log.info("errorMsg? {}", errorMsg);
        try {
            Payments payments = new Payments();
            payments.setOrdersNo(ordersNo);
            payments.setPaymentMethod("card");
            payments.setStatus(PaymentStatus.결제완료);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

            // 날짜 null 처리
            if (date == null || date.isEmpty() || time == null || time.isEmpty()) {
                // date나 time이 없을 때 현재 시간으로 설정
                Date now = new Date();
                payments.setServiceDate(now);
            } else {
                // date와 time이 있을 때 입력값을 파싱하여 설정
                String serviceDate = date + ' ' + time;
                Date orderServiceDate = sdf.parse(serviceDate);
                payments.setServiceDate(orderServiceDate);
            }

            // 장소 null 처리
            if (userAddress == null || userAddress.isEmpty() || userPost == null || userPost.isEmpty()) {
                String address = "사용자가 주소를 지정하지 않았습니다.";
                payments.setServiceAddress(address);
            } else {
                String address = "(" + userPost + ") " + userAddress;
                payments.setServiceAddress(address);
            }

            // 결제 정보 저장
            paymentService.insert(payments);

            // 결제 상태를 PENDING으로 변경 (결제 실패 시)
            payments = paymentService.selectByOrdersNo(ordersNo);
            payments.setStatus(PaymentStatus.보류);
            paymentService.merge(payments);

            Orders order = orderService.select(ordersNo);

            log.info("[결제 실패] 에러 메시지 : " + errorMsg);

            // JSON 응답 데이터 구성
            Map<String, Object> response = new HashMap<>();
            response.put("payments", payments);
            response.put("order", order);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            log.error("결제 실패 처리 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 실패 처리 중 오류 발생");
        }
    }


    /**
     * 주문/결제  
     * - ➡ 결제하기
     * @param model
     * @param orderId
     * @return
     * @throws Exception
     */
    @GetMapping("/{ordersNo}")
    public ResponseEntity<?> checkout(@PathVariable("ordersNo") String ordersNo) {
        log.info(ordersNo);
        try {
            // 주문 정보 가져오기
            Orders order = orderService.select(ordersNo);
            if (order == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("주문을 찾을 수 없습니다.");
            }

            // 주문 항목 정보 가져오기
            List<OrderItems> orderItems = orderItemService.listByOrderNo(ordersNo);

            // JSON 응답 데이터 구성
            Map<String, Object> response = new HashMap<>();
            response.put("order", order);
            response.put("orderItems", orderItems);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            log.error("주문 조회 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 조회 중 오류 발생");
        }
    }


    /**
     * 결제 취소
     * @param ordersNo
     * @param cancelAccount
     * @param cancelName
     * @param cancelNumber
     * @param reason
     * @param model
     * @return
     * @throws Exception
     */
    @PostMapping("/cancel")
    public ResponseEntity<Object> cancelOrder(@RequestParam String ordersNo,
                                              @RequestParam String cancelAccount,
                                              @RequestParam String cancelName,
                                              @RequestParam String cancelNumber,
                                              @RequestParam String reason) {
        try {
            // orders 수정
            Orders orders = orderService.select(ordersNo);
            if (orders == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("주문을 찾을 수 없습니다.");
            }
            orders.setOrderStatus(OrderStatus.보류중);
            orderService.update(orders);

            // 데이터 넣기
            Cancel cancel = new Cancel();
            cancel.setReason(reason);
            cancel.setCancelAmount(orders.getTotalPrice());
            cancel.setConfirmed(0);
            cancel.setRefund(0);
            cancel.setCancelAccount(cancelAccount);
            cancel.setCancelNumber(cancelNumber);
            cancel.setCancelName(cancelName);
            cancel.setOrdersNo(ordersNo);

            cancelService.insert(cancel);

            // JSON 응답 데이터 구성
            return ResponseEntity.ok().body(cancel);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 취소 중 오류 발생: " + e.getMessage());
        }
    }   
}