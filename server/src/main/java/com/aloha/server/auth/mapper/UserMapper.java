package com.aloha.server.auth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.aloha.server.auth.dto.UserAuth;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.partner.dto.Partner;
import com.aloha.server.reservation.dto.Orders;

@Mapper
public interface UserMapper {

    // 로그인
    public Users login(String username);

    // 아이디 찾기
    public  String findUserByDetails(@Param("userName") String userName, 
                                     @Param("userEmail") String userEmail, 
                                     @Param("userPhone") String userPhone) throws Exception;

    // 비밀번호 재설정
    public int updatePw(@Param("userId") String userId, @Param("userPassword") String userPassword) throws Exception;
                                     
    // 회원 조회
    public Users select(@Param("userId") String userId) throws Exception;

    // 회원 조회 - userNo
    public Users selectUserNo(int userNo) throws Exception;

    // 이메일로 사용자 조회
    public Users findUserByEmail(String userEmail) throws Exception;

    // 회원 가입
    public int join(Users user) throws Exception;
    
    // 회원 권한 등록
    public int insertAuth(UserAuth userAuth) throws Exception;
    
    // 파트너 신청
    public int insertPartner(Partner partner);
    
    // 파트너 신청 대기
    public int updateUserStatus(@Param("userNo") int userNo);

    // ----------------------------------------------------------------------------
    
    // user 및 partner 테이블에서 정보를 조회
    public Partner selectUserAndPartnerDetails(@Param("userNo") int userNo);
    
    // 회원 수정
    public int update(Users user) throws Exception;

    // 회원 탈퇴
    public int delete(Users userId) throws Exception;

    // 예약 가져오기
    public List<Orders> selectOrdersByUserId(String userId) throws Exception;

    public void OrdersDelete(@Param("orders_no") String ordersNo) throws Exception;
    
    // 파트너 찾기
    public Partner selectPartner(int userNo) throws Exception;
    
    // 번호 유저찾기
    public Users selectByUserNo(int userNo) throws Exception;
    
    // 유저 정보 찾기
    public Users findByUsername(String username);

    public Users findUserById(int userNo) throws Exception;

    // ----------------------------------------------------------------------------

    // 소셜 회원 가입
    // public int insertSocial(userSocial userSocial) throws Exception;

    // 소셜 회원 조회
    // public UserSocial selectSocial(UserSocial userSocial) throws Exception;

    // 소셜 회원 수정
    // public int updateSocial(UserSocial userSocial) throws Exception;

    // 소셜 정보로 회원 조회
    // public Users selectBySocial(UserSocial userSocial) throws Exception;
}
