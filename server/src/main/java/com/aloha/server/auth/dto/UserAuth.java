package com.aloha.server.auth.dto;

import lombok.Data;

// 회원 권한
@Data
public class UserAuth {
    private int authNo;
    private int userNo;
    private String userId;
    private String auth;

    public UserAuth() {}

    public UserAuth(String userId, String auth) {
        this.userId = userId;
        this.auth = auth;
    }

    public UserAuth(int userNo, String auth) {
        this.userNo = userNo;
        this.auth = auth;
    }
}
