package com.daeut.daeut.reservation.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daeut.daeut.auth.dto.Users;
import com.daeut.daeut.reservation.dto.ChatRooms;
import com.daeut.daeut.reservation.dto.Chats;
import com.daeut.daeut.reservation.service.ChatRoomService;
import com.daeut.daeut.reservation.service.ChatService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ChatController {

    /*
     * SimpMessageSendingOperations : 메세징 지원을 위해 제공되는 템플릿 클래스
     *                                서버에서 클라이언트로 메세지를 push하는데 사용
     *                                메세지 전송, 특정 주제에 대한 메세지 전송, 즉 브로드캐스트 가능
     *                                사용자 전송, 특정 사용자의 queue에 메세지를 전송해 1:1 구현
     */
    @Autowired
    private SimpMessageSendingOperations template;

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRoomService chatRoomService;

    /**
     * 채팅방 조회
     * @param roomNo
     * @param session
     * @return
     */
    @GetMapping("/chat")
    public ResponseEntity<Object> goToChatRoom(@RequestParam("roomNo") String roomNo) {
        try {
            // Retrieve user from session
            // Users user = (Users) session.getAttribute("user");
            // if (userNo == 0) {
            //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 만료되었거나 유효하지 않습니다.");
            // }

            // Retrieve chat room and partner information
            ChatRooms chatRooms = chatRoomService.select(roomNo);
            if (chatRooms == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("채팅 방을 찾을 수 없습니다.");
            }
            int partnerNo = chatRooms.getPartnerNo();

            // Retrieve chat list for the room
            List<Chats> chatList = chatService.selectByRoomNo(roomNo);

            // Prepare JSON response
            Map<String, Object> response = new HashMap<>();
            response.put("chatRooms", chatRooms);
            response.put("partnerNo", partnerNo);
            // response.put("user", userNo);
            response.put("roomNo", roomNo);
            response.put("chatList", chatList);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("채팅 방 조회 중 오류 발생: " + e.getMessage());
        }
    }

    /**
     * 메세지 전송
     * @param chat
     * @throws Exception
     */
    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload Chats chat) throws Exception {
        chatService.insert(chat);
        log.info("chat? {}", chat);

        template.convertAndSend("/sub/chat/" + chat.getRoomNo(), chat);        
    }
}
