package com.aloha.server.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.aloha.server.auth.dto.CustomUser;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.auth.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) {
        log.info("login - loadUserByUsername : " + username);
        Users user = null;
        try {
            log.info("유저이름이야야야야야양" + username);
            user = userMapper.login(username);
            log.info("user ::::::::::::::: " + user);
        } catch (Exception e) {
            log.error("Error while fetching user details: ", e);
            throw new UsernameNotFoundException("Error while fetching user details", e);
        }

        if (user == null) {
            log.info("사용자 없음...");
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username);
        }
        log.info("user :::::");
        log.info(user.toString());
        CustomUser customUser = new CustomUser(user);

        log.info("customuser :::::");
        log.info(customUser.toString());
        return customUser;
    }
}