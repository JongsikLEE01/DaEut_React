package com.aloha.server.auth.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.auth.dto.CustomUser;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.auth.service.EmailService;
import com.aloha.server.auth.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    // 로그인 선택
    @GetMapping("/member")
    public ResponseEntity<String> loginMain() {
        return new ResponseEntity<>("Login main page", HttpStatus.OK);
    }

    // 회원가입 화면
    @GetMapping("/join")
    public ResponseEntity<String> join() {
        return new ResponseEntity<>("Join page", HttpStatus.OK);
    }

    // 아이디 중복 확인
    @GetMapping("/check-duplicate")
    @ResponseBody
    public ResponseEntity<Map<String, Boolean>> checkDuplicateId(@RequestParam String userId) throws Exception {
        Users user = userService.select(userId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", user != null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 이메일 중복 확인
    @GetMapping("/check-duplicate-email")
    @ResponseBody
    public ResponseEntity<Map<String, Boolean>> checkDuplicateEmail(@RequestParam String userEmail) throws Exception {
        Users user = userService.findUserByEmail(userEmail);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", user != null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * 회원가입
     * @param entity
     * @return
     * @throws Exception
     */
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody Users user) throws Exception {
        log.info("[POST] - /users");
        int result = userService.join(user);

        if( result > 0 ) {
            log.info("회원가입 성공! - SUCCESS");
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        else {
            log.info("회원가입 실패! - FAIL");
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } 
    }

    // 회원가입 완료
    @GetMapping("/joinDone")
    public ResponseEntity<?> joinDone() {
        Map<String, String> response = new HashMap<>();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 로그인 화면
    // @GetMapping("/login")
    // public ResponseEntity<Map<String, Object>> login(@RequestParam(value = "error", required = false) String error,
    //                                                  @CookieValue(value = "remember-id", required = false) Cookie cookie) {
    //     Map<String, Object> response = new HashMap<>();
    //     if (error != null) {
    //         response.put("errorMessage", "아이디 또는 비밀번호가 올바르지 않습니다.");
    //     }

    //     String userId = "";
    //     boolean rememberId = false;

    //     if (cookie != null) {
    //         log.info("CookieName : " + cookie.getName());
    //         log.info("CookieValue : " + cookie.getValue());
    //         userId = cookie.getValue();
    //         rememberId = true;
    //     }

    //     response.put("userId", userId);
    //     response.put("rememberId", rememberId);

    //     return new ResponseEntity<>(response, HttpStatus.OK);
    // }

    // 로그인 처리
    // @PostMapping("/login")
    // public ResponseEntity<String> loginUser(@RequestParam String userId, @RequestParam String userPassword, HttpSession session) {
    //     try {
    //         Users user = userService.select(userId);
    //         if (user == null || !new BCryptPasswordEncoder().matches(userPassword, user.getUserPassword())) {
    //             return new ResponseEntity<>("아이디 또는 비밀번호가 올바르지 않습니다.", HttpStatus.BAD_REQUEST);
    //         }
    //         // 로그인 성공 처리 (예: 세션에 사용자 정보 저장)
    //         return new ResponseEntity<>("로그인 성공", HttpStatus.OK);
    //     } catch (Exception e) {
    //         log.error("로그인 중 오류가 발생했습니다.", e);
    //         return new ResponseEntity<>("로그인 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    // 아이디 찾기 화면
    @GetMapping("/findId")
    public ResponseEntity<String> findId() {
        return new ResponseEntity<>("Find ID page", HttpStatus.OK);
    }

    // 아이디 찾기 처리
    @PostMapping("/findId")
    public ResponseEntity<Map<String, Object>> findId(@RequestBody Users users) {

        Map<String, Object> response = new HashMap<>();
        
        if (users == null ) {
            response.put("error", "사용자 정보를 찾을 수 없습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        log.info("users : " + users);
        String userName = users.getUserName();
        String userEmail = users.getUserEmail();
        String userPhone = users.getUserPhone();

        log.info("::::::::::::::::::::");
        log.info("userName : " + userName);
        log.info("userEmail : " + userEmail);
        log.info("userPhone : " + userPhone);
        log.info("::::::::::::::::::::");
        
        try {
            String userId = userService.findUserByDetails(userName, userEmail, userPhone);
            if (userId != null) {
                response.put("userId", userId);
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "일치하는 사용자 정보를 찾을 수 없습니다.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (UsernameNotFoundException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            log.error("아이디 찾기 중 오류가 발생했습니다.", e);
            response.put("error", "아이디 찾기 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    


    // 아이디 찾기 완료
    @GetMapping("/findIdComplete")
    public ResponseEntity<Map<String, String>> findIdComplete(@RequestParam String userId) {
        Map<String, String> response = new HashMap<>();
        response.put("userId", userId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // 비밀번호 찾기 화면
    @GetMapping("/findPw")
    public ResponseEntity<String> findPw() {
        return new ResponseEntity<>("Find Password page", HttpStatus.OK);
    }

    // 비밀번호 찾기 처리
    @PostMapping("/sendAuthCode")
    public ResponseEntity<Map<String, String>> sendAuthCode(@RequestBody Map<String, String> payload) {
        Map<String, String> response = new HashMap<>();
        try {
            String userEmail = payload.get("userEmail");
            String authCode = generateAuthCode();
            emailService.sendSimpleMessage(userEmail, "비밀번호 찾기 인증 코드", "인증 코드: " + authCode);
            response.put("message", "인증 코드가 이메일로 전송되었습니다.");
            response.put("authCode", authCode); // 인증 코드를 클라이언트에 반환 (실제 서비스에서는 보안상 제거 필요)
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("인증 코드 전송 중 오류가 발생했습니다.", e);
            response.put("message", "인증 코드 전송에 실패했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/verifyAuthCode")
    public ResponseEntity<Map<String, String>> verifyAuthCode(@RequestBody Map<String, String> payload) {
        Map<String, String> response = new HashMap<>();
        try {
            String userEmail = payload.get("userEmail");
            String authCode = payload.get("authCode");
            String inputAuthCode = payload.get("inputAuthCode");

            if (authCode != null && authCode.equals(inputAuthCode)) {
                response.put("message", "인증 성공");
                response.put("userEmail", userEmail);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("message", "인증 코드가 잘못되었거나 유효하지 않습니다.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("인증 코드 검증 중 오류가 발생했습니다.", e);
            response.put("message", "인증 코드 검증 중 오류가 발생했습니다.");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 비밀번호 재설정
    @PostMapping("/resetPw")
    public ResponseEntity<?> resetPw(@RequestBody Users users) {
        String userId = users.getUserId();
        String userPassword = users.getUserPassword();
        String confirmPassword = users.getConfirmPassword();

        log.info(":::::::::::::::::::::::::");
        log.info("userId : " + userId);
        log.info("userPassword : " + userPassword);
        log.info("confirmPassword : " + confirmPassword);
        log.info(":::::::::::::::::::::::::");

        try {
            Users user = userService.select(userId);
            log.info(user.toString());
            if (user != null) {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

                if (passwordEncoder.matches(userPassword, user.getUserPassword())) {
                    return new ResponseEntity<>("SAME", HttpStatus.OK);
                }

                if (!userPassword.equals(confirmPassword)) {
                    return new ResponseEntity<>("CHECKAGAIN", HttpStatus.OK);
                }

                user.setUserPassword(userPassword); // 사용자 객체에 새로운 비밀번호 설정
                userService.updatePw(user); // 서비스 메서드 변경

                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비밀번호 재설정 중 오류가 발생했습니다.");
        }
    }

    // 비밀번호 재설정 성공
    @GetMapping("/resetPwComplete")
    public ResponseEntity<Map<String, String>> resetPwComplete() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "비밀번호 재설정이 완료되었습니다.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    private String generateAuthCode() {
        Random random = new Random();
        int authCode = 100000 + random.nextInt(900000);
        return String.valueOf(authCode);
    }
    
    /**
     * 사용자 정보 조회
     * @param customUser
     * @return
     */
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@AuthenticationPrincipal CustomUser customUser) {
        
        log.info("::::: customUser :::::");
        log.info("customUser : "+ customUser);

        Users user = customUser.getUser();
        log.info("user : " + user);

        // 인증된 사용자 정보 
        if( user != null )
            return new ResponseEntity<>(user, HttpStatus.OK);

        // 인증 되지 않음
        return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    // @PreAuthorize("hasRole('ROLE_USER')")                    // 👩‍💼 사용자 권한만 허용
    // @PreAuthorize("#user.userId == authentication.name")     // 👩‍💻 인증된 사용자 자신만 허용
    // @PreAuthorize("hasRole('ROLE_USER') and #user.userId == authentication.name") // 👩‍💼 + 👩‍💻
    // @PreAuthorize("hasRole('ROLE_ADMIN') or #user.userId == authentication.name")    // 👮‍♀️ + 👩‍💻
    // @PutMapping("")
    // public ResponseEntity<?> update(@RequestBody Users user) throws Exception {
    //     log.info("[PUT] - /users");
    //     int result = userService.update(user);

    //     if( result > 0 ) {
    //         log.info("회원수정 성공! - SUCCESS");
    //         return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    //     }
    //     else {
    //         log.info("회원수정 실패! - FAIL");
    //         return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    //     } 
    // }
    

    // @PreAuthorize("hasRole('ROLE_USER')")                    // 👩‍💼 사용자 권한만 허용
    // @PreAuthorize("#user.userId == authentication.name")     // 👩‍💻 인증된 사용자 자신만 허용
    // @PreAuthorize("hasRole('ROLE_USER') and #userId == authentication.name") // 👩‍💼 + 👩‍💻
    // @PreAuthorize("hasRole('ROLE_ADMIN') or #userId == authentication.name")    // 👮‍♀️ + 👩‍💻
    // @DeleteMapping("/{userId}")
    // public ResponseEntity<?> destroy(@PathVariable("userId") String userId) throws Exception {
    //     log.info("[DELETE] - /users/{userId}");

    //     int result = userService.delete(userId);

    //     if( result > 0 ) {
    //         log.info("회원삭제 성공! - SUCCESS");
    //         return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    //     }
    //     else {
    //         log.info("회원삭제 실패! - FAIL");
    //         return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
    //     }
        
    // }
    

}
