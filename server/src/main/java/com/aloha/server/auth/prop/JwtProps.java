package com.aloha.server.auth.prop;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@ConfigurationProperties("com.aloha.server")       // com.aloha.server 경로 하위 속성들을 지정
public class JwtProps {
    
    // com.aloha.server.secretKey로 지정된 프로퍼티 값을 주입받는 필드
    // ✅ com.aloha.server.secret-key ➡ secretKey : {인코딩된 시크릿 키}
    private String secretKey;
    

}