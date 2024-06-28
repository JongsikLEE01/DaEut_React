package com.daeut.daeut.tip.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.daeut.daeut.tip.dto.Reply;
import com.daeut.daeut.tip.service.ReplyService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    // 댓글 목록 조회
    @GetMapping("/list")
    public ResponseEntity<List<Reply>> getReplies(@RequestParam("boardNo") int boardNo) throws Exception {
        List<Reply> replies = replyService.listByBoardNo(boardNo);
        return ResponseEntity.ok(replies);
    }

    // 댓글 등록
    // @PostMapping("/insert")
    // public ResponseEntity<String> insert(@RequestBody Reply reply) {
    //     String currentUserId = getCurrentUserId();
    //     if (currentUserId != null) {
    //         reply.setUserId(currentUserId);
    //     } else {
    //         return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    //     }

    //     log.info("Inserting reply: {}", reply);

    //     try {
    //         int result = replyService.insert(reply);
    //         if (result > 0) {
    //             return ResponseEntity.status(HttpStatus.CREATED).body("SUCCESS");
    //         }
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
    //     } catch (Exception e) {
    //         log.error("Error inserting reply", e);
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
    //     }
    // }

    // 댓글 등록
    @PostMapping("/insert")
    public ResponseEntity<String> insert(@RequestBody Reply reply) {
        try {
            // 임시로 사용자 ID를 설정하지 않고 댓글을 등록
            int result = replyService.insert(reply);
            if (result > 0) {
                return ResponseEntity.status(HttpStatus.CREATED).body("SUCCESS");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        } catch (Exception e) {
            log.error("Error inserting reply", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }


    // // 댓글 수정
    // @PutMapping("/{replyNo}")
    // public ResponseEntity<String> update(@PathVariable int replyNo, @RequestBody Reply reply) {
    //     String currentUserId = getCurrentUserId();
    //     if (currentUserId == null) {
    //         return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    //     }

    //     log.info("Trying to update reply with ID: {}", replyNo);

    //     try {
    //         Reply existingReply = replyService.select(replyNo);
    //         if (existingReply == null) {
    //             return new ResponseEntity<>("NOT_FOUND", HttpStatus.NOT_FOUND);
    //         }

    //         if (!existingReply.getUserId().equals(currentUserId) && !isAdmin()) {
    //             throw new IllegalAccessException("수정 권한이 없습니다.");
    //         }

    //         reply.setReplyNo(replyNo);
    //         int result = replyService.update(reply);
    //         if (result > 0) {
    //             return ResponseEntity.ok("SUCCESS");
    //         }
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
    //     } catch (Exception e) {
    //         log.error("Error updating reply", e);
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
    //     }
    // }

    // 댓글 수정
    @PutMapping("/{replyNo}")
    public ResponseEntity<String> update(@RequestBody Reply reply) {
        try {
            // 임시로 사용자 ID를 무시하고 댓글을 수정
            int result = replyService.update(reply);
            
            // 수정 성공 여부에 따라 응답 반환
            if (result > 0) {
                return ResponseEntity.ok("SUCCESS");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        } catch (Exception e) {
            log.error("Error updating reply", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }


    // 댓글 삭제
    // @DeleteMapping("/{replyNo}")
    // public ResponseEntity<String> delete(@PathVariable int replyNo) {
    //     String currentUserId = getCurrentUserId();
    //     if (currentUserId == null) {
    //         return new ResponseEntity<>("UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    //     }

    //     log.info("Trying to delete reply with ID: {}", replyNo);

    //     try {
    //         Reply existingReply = replyService.select(replyNo);
    //         if (existingReply == null) {
    //             return new ResponseEntity<>("NOT_FOUND", HttpStatus.NOT_FOUND);
    //         }

    //         if (!existingReply.getUserId().equals(currentUserId) && !isAdmin()) {
    //             throw new IllegalAccessException("삭제 권한이 없습니다.");
    //         }

    //         int result = replyService.delete(replyNo);
    //         if (result > 0) {
    //             return ResponseEntity.ok("SUCCESS");
    //         }
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
    //     } catch (Exception e) {
    //         log.error("Error deleting reply", e);
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
    //     }
    // }

    @DeleteMapping("/{replyNo}")
    public ResponseEntity<String> delete(@PathVariable int replyNo) {
        log.info("Trying to delete reply with ID: {}", replyNo);

        try {
            Reply existingReply = replyService.select(replyNo);
            if (existingReply == null) {
                return new ResponseEntity<>("NOT_FOUND", HttpStatus.NOT_FOUND);
            }

            int result = replyService.delete(replyNo);
            if (result > 0) {
                return ResponseEntity.ok("SUCCESS");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        } catch (Exception e) {
            log.error("Error deleting reply", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FAIL");
        }
    }


    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
    }

    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return ((UserDetails) authentication.getPrincipal()).getUsername();
        }
        return null;
    }
}