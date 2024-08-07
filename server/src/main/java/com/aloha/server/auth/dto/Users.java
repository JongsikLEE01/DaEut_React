package com.aloha.server.auth.dto;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import lombok.Data;

@Data
public class Users {
    private int userNo; // 사용자 번호
    private String userName; // 사용자 이름
    private String userPhone; // 사용자 전화번호

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date userBirth; // 사용자 생년월일
    
    private String userAddress; // 사용자 주소
    private String userEmail; // 사용자 이메일
    private String userGender; // 사용자 성별
    private String userId; // 사용자 아이디
    private String userPassword; // 사용자 비밀번호
    private String confirmPassword;
    private Date userRegDate; // 사용자 등록일자
    private String userCoupon; // 사용자 쿠폰
    private Date userUpdDate; // 사용자 수정일자
    private int enabled; // 활성화 여부
    private int status; // 상태
    private int partnerNo;  // 파트너 번호

    // 권한 목록
    private List<UserAuth> authList;

    public Users() {
        
    }
    
    public Users(Users user) {
        this.userNo = user.getUserNo();
        this.userName = user.getUserName();
        this.userPhone = user.getUserPhone();
        this.userBirth = user.getUserBirth();
        this.userAddress = user.getUserAddress();
        this.userEmail = user.getUserEmail();
        this.userGender = user.getUserGender();
        this.userId = user.getUserId();
        this.userPassword = user.getUserPassword();
        this.userRegDate = user.getUserRegDate();
        this.userCoupon = user.getUserCoupon();
        this.userUpdDate = user.getUserUpdDate();
        this.enabled = user.getEnabled();
        this.status = user.getStatus();
        this.authList = user.getAuthList();
        this.partnerNo = user.getPartnerNo();
    }
}
