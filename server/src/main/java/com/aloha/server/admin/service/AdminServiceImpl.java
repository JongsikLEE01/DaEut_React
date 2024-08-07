package com.aloha.server.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aloha.server.admin.mapper.AdminMapper;
import com.aloha.server.auth.dto.Review;
import com.aloha.server.auth.dto.UserAuth;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.auth.mapper.UserMapper;
import com.aloha.server.auth.service.UserService;
import com.aloha.server.main.dto.Files;
import com.aloha.server.main.dto.Page;
import com.aloha.server.partner.dto.Partner;
import com.aloha.server.reservation.dto.Orders;
import com.aloha.server.reservation.dto.Payments;
import com.aloha.server.reservation.mapper.OrderMapper;
import com.aloha.server.reservation.service.PaymentService;
import com.aloha.server.reservation.service.ReservationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService PaymentService;

    @Autowired
    private ReservationService reservation;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${system.pw}")
    private String systemPw;

    // 관리자 회원가입
    @Transactional
    @Override
    public void adminJoin(Users user, String systemPw) throws Exception {
        if (!this.systemPw.equals(systemPw)) {
            throw new IllegalArgumentException("시스템 비밀번호가 잘못되었습니다.");
        }
        String password = user.getUserPassword();
        String encodedPassword = passwordEncoder.encode(password);
        user.setUserPassword(encodedPassword);
        int result = userMapper.join(user);
        if (result > 0) {
            Users joinedUser = userMapper.select(user.getUserId());
            int userNo = joinedUser.getUserNo();
            UserAuth userAuthUser = new UserAuth();
            userAuthUser.setUserNo(userNo);
            userAuthUser.setAuth("ROLE_USER");
            userMapper.insertAuth(userAuthUser);
            UserAuth userAuthPartner = new UserAuth();
            userAuthPartner.setUserNo(userNo);
            userAuthPartner.setAuth("ROLE_PARTNER");
            userMapper.insertAuth(userAuthPartner);
            UserAuth userAuthAdmin = new UserAuth();
            userAuthAdmin.setUserNo(userNo);
            userAuthAdmin.setAuth("ROLE_ADMIN");
            userMapper.insertAuth(userAuthAdmin);
        }
    }

    // 모든 사용자 목록 조회
    @Override
    public int countUsers() throws Exception {
        return adminMapper.countUsers();
    }

    // 모든 사용자 목록 조회
    @Override
    public List<Users> selectAllUsers(Page page) throws Exception {
        List<Users> userList = adminMapper.selectAllUsers(page);
        // ROLE_USER만 필터링
        log.info("user: " + userList);
        return userList;
    }

    // 모든 파트너 목록 조회
    @Override
    public int countPartners() throws Exception {
         return adminMapper.countPartners();
    }
    
    // 모든 파트너 목록 조회
    @Override
    public List<Partner> selectAllPartners(Page page) throws Exception {
        List<Partner> partnerList = adminMapper.selectAllPartners(page);
        log.info("partner: " + partnerList);
        return partnerList;
    }

    // 관리자 - 회원 선택 삭제
    @Override
    public int deleteList(String[] deleteNoList) throws Exception {
        String deleteNos = String.join(",", deleteNoList);
        int result = adminMapper.deleteList(deleteNos);
        return result;
    }

    // 관리자 - 회원 조회
    @Override
    public Users findUserById(int userNo) throws Exception {
        Users users = adminMapper.findUserById(userNo);
        return users;
    }
    
    // 관리자 - 회원 수정
    @Override
    public int adminUpdateUser(Users user) throws Exception {
        int result = adminMapper.adminUpdateUser(user);
        log.info("++++++++++++++++++++++" + result);
        return result;
    }

    // 관리자 - 회원 삭제
    @Override
    public int adminDeleteUser(int userNo) throws Exception {
        int result = adminMapper.adminDeleteUser(userNo);
        return result;
    }

    // 관리자 - 리뷰 삭제
    @Override
    public int adminDeleteReview(int reviewNo) throws Exception {
        int result = adminMapper.adminDeleteReview(reviewNo);
        log.info("impl :" + result);
        return result;
    }

    // 관리자 - 파트너 조회
    @Override
    public Partner findPartnerById(int userNo) throws Exception {
    Partner partner = adminMapper.findPartnerById(userNo);
    // log.info("partner +++++++++++++++++ " + partner);
    return partner;
    }

    // 관리자 - 파트너 수정
    @Override
    public int adminUpdatePartner(Partner partner) throws Exception {
        int result = adminMapper.adminUpdatePartner(partner);
        return result;
    }

    // 관리자 - 파트너 삭제
    @Override
    public int adminDeletePartner(int userNo) throws Exception {
        int result = adminMapper.adminDeleteUser(userNo);
        return result;
    }

    // 파트너 승인
    @Override
    @Transactional
    public int approvePartner(String userId) throws Exception {
        // 파트너 상태를 승인된 상태(2)로 변경
        return adminMapper.approvePartner(userId);
    }

    // 파트너 권한 추가
    @Override
    @Transactional
    public int insertPartnerAuth(String userId) throws Exception {
        // 파트너 권한 추가
        return adminMapper.insertPartnerAuth(userId);
    }

    // 파트너 승인 취소
    @Override
    public int cancelPartner(String userId) throws Exception {
        return adminMapper.cancelPartner(userId);
    }

    // 파트너 권한 회수
    @Override
    public int deletePartnerAuth(String userId) throws Exception {
        return adminMapper.deletePartnerAuth(userId);
    }

    // 예약된 수를 카운트하는 쿼리
    @Override
    public int countReservations() throws Exception {
        return adminMapper.countReservations();
    }

    // 모든 주문 조회
    @Override
    public List<Orders> list(Page page) throws Exception {
        List<Orders> orderList = adminMapper.list(page);
        log.info("orderList : " + orderList);
        return orderList;
    }

     // 관리자 - 모든 주문 조회
     @Override
     public Orders adminReadReservation(String ordersNo) throws Exception {
         Orders orders = adminMapper.adminReadReservation(ordersNo);
         log.info("------------orders----------" + orders);
         return orders;
     }

     // 관리자 - 예약 수정
    @Override
    public int adminUpdateReservation(Orders orders, Payments Payments, Users users) throws Exception {
        int userUpdateResult = userService.update(users);
        log.info("zzzzzzzzzzzzzzzz" + users);
        int orderUpdateResult = orderMapper.updateData(orders);
        log.info("zzzzzzzzzzzzzzzz" + orders);
        int paymentUpdateResult = PaymentService.updateData(Payments);
        log.info("zzzzzzzzzzzzzzzz" + Payments);
        

        int result =  userUpdateResult + orderUpdateResult + paymentUpdateResult;
        log.info("zzzzzzzzzzzzzzzz" + orderUpdateResult);
        return result;
    }

    @Override
    public List<Review> selectReviewsByUser(int userNo) throws Exception {
        List<Review> reviewList = adminMapper.selectReviewsByUser(userNo);
        log.info("reviewList : " + reviewList);
        return reviewList;
    }

    @Override
    public Files partnerThumbnail(int partnerNo) throws Exception {
        // 썸네일
        Files pthumbnail = reservation.partnerThumbnail(partnerNo);
        return pthumbnail;
    }
}