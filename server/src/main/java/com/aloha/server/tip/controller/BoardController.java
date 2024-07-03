package com.aloha.server.tip.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.main.dto.Files;
import com.aloha.server.tip.dto.Option2;
import com.aloha.server.tip.dto.Reply;
import com.aloha.server.main.dto.Page;
import com.aloha.server.main.service.FileService;
import com.aloha.server.tip.dto.Board;
import com.aloha.server.tip.service.BoardService;
import com.aloha.server.tip.service.ReplyService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tip")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private FileService filesService;

    @Autowired
    private ReplyService replyService;

    @GetMapping("/boards")
    public ResponseEntity<Map<String, Object>> getBoards(Page page, Option2 option, @RequestParam(value = "sort", defaultValue = "latest") String sort) throws Exception {
        page = new Page(page.getPage(), 9, page.getCount(), page.getTotal());
        List<Board> boardList = boardService.list(page, option, sort);

        for (Board board : boardList) {
            int replyCount = replyService.countByBoardNo(board.getBoardNo());
            board.setReplyCount(replyCount);
        }

        log.info("page : " + page);
        log.info("option : " + option);

        List<Option2> optionList = new ArrayList<>();
        optionList.add(new Option2("전체", 0));
        optionList.add(new Option2("제목", 1));
        optionList.add(new Option2("내용", 2));
        optionList.add(new Option2("제목+내용", 3));
        optionList.add(new Option2("작성자", 4));

        Map<String, Object> response = new HashMap<>();
        response.put("boardList", boardList);
        response.put("page", page);
        response.put("option", option);
        response.put("sort", sort);
        response.put("optionList", optionList);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/boards/{boardNo}")
    public ResponseEntity<Map<String, Object>> getBoard(@PathVariable int boardNo, Files file) throws Exception {
        Board board = boardService.select(boardNo);
        int view = boardService.view(boardNo);

        log.info("------------------------------------");
        log.info("-----------------/api/tip/boards/{boardNo}-------------------");
        log.info(board.toString());

        int replyCount = replyService.countByBoardNo(boardNo);
        board.setReplyCount(replyCount);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = null;
        Set<String> currentRoles = new HashSet<>();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            currentUserId = userDetails.getUsername();
            currentRoles = AuthorityUtils.authorityListToSet(userDetails.getAuthorities());
        }

        boolean isWriter = currentUserId != null && currentUserId.equals(board.getUserId());
        boolean isAdmin = currentRoles.contains("ROLE_ADMIN");

        file.setParentTable("board");
        file.setParentNo(boardNo);
        List<Files> fileList = filesService.listByParent(file);
        log.info(fileList.toString());

        List<Reply> replyList = replyService.listByBoardNo(boardNo);

        Map<String, Object> response = new HashMap<>();
        response.put("board", board);
        response.put("fileList", fileList);
        response.put("replyList", replyList);
        response.put("isWriter", isWriter);
        response.put("isAdmin", isAdmin);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/boards")
    public ResponseEntity<String> createBoard(
        @RequestParam("boardTitle") String boardTitle,
        @RequestParam("boardContent") String boardContent,
        @RequestParam("userNo") int userNo,
        @RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
        @RequestParam(value = "file", required = false) List<MultipartFile> files) {
        try {
            // 로그로 데이터 확인
            log.info("boardTitle: {}, boardContent: {}, userNo: {}", boardTitle, boardContent, userNo);
            if (thumbnail != null) {
                log.info("Thumbnail file name: {}", thumbnail.getOriginalFilename());
            }
            if (files != null) {
                for (MultipartFile file : files) {
                    log.info("File name: {}", file.getOriginalFilename());
                }
            }

            Board board = new Board();
            board.setBoardTitle(boardTitle);
            board.setBoardContent(boardContent);
            board.setUserNo(userNo); // userNo 설정

            int result = boardService.insert(board);
            if (result > 0) {
                return ResponseEntity.ok("Board created successfully");
            }
            return ResponseEntity.badRequest().body("Failed to create board");
        } catch (Exception e) {
            log.error("Error creating board", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error occurred");
        }
    }

    @PutMapping("/boards/{boardNo}")
    public ResponseEntity<String> updateBoard(@PathVariable int boardNo, @RequestBody Board board) throws Exception {
        // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // String currentUserId = authentication.getName();
        // Board existingBoard = boardService.select(boardNo);
        // if (!existingBoard.getUserId().equals(currentUserId) && !isAdmin(authentication)) {
        //     throw new IllegalAccessException("수정 권한이 없습니다.");
        // }

        // 임시로 권한 검사를 무시하고 주석 처리된 코드를 대체할 코드
        log.info("board?? : {}", board);
        int result = boardService.update(board);
        if (result > 0) {
            return ResponseEntity.ok("Board updated successfully");
        }
        return ResponseEntity.badRequest().body("Failed to update board");
    }


    @DeleteMapping("/boards/{boardNo}")
    public ResponseEntity<String> deleteBoard(@PathVariable int boardNo) throws Exception {
        // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // String currentUserId = authentication.getName();

        // Board existingBoard = boardService.select(boardNo);
        // if (!existingBoard.getUserId().equals(currentUserId) && !isAdmin(authentication)) {
        //     throw new IllegalAccessException("삭제 권한이 없습니다.");
        // }

        int result = boardService.delete(boardNo);
        if (result > 0) {
            Files file = new Files();
            file.setParentTable("board");
            file.setParentNo(boardNo);
            filesService.deleteByParent(file);

            return ResponseEntity.ok("Board deleted successfully");
        }
        return ResponseEntity.badRequest().body("Failed to delete board");
    }

    @PutMapping("/boards/{boardNo}/like")
    public ResponseEntity<Map<String, Object>> incrementBoardLike(@PathVariable int boardNo, @RequestParam int userNo, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Integer> likedBoards = (List<Integer>) session.getAttribute("likedBoards");
            if (likedBoards == null) {
                likedBoards = new ArrayList<>();
            }

            if (likedBoards.contains(boardNo)) {
                response.put("success", false);
                response.put("message", "이미 추천한 게시글입니다.");
            } else {
                boardService.incrementBoardLike(boardNo, userNo);
                likedBoards.add(boardNo);
                session.setAttribute("likedBoards", likedBoards);
                response.put("success", true);
                response.put("message", "게시글 추천 완료!");
            }
        } catch (Exception e) {
            log.error("추천 증가 중 오류 발생", e);
            response.put("success", false);
            response.put("message", e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/replies")
    public ResponseEntity<String> insertReply(@RequestParam("boardNo") int boardNo, @RequestParam("replyContent") String replyContent, @RequestParam("userNo") int userNo) throws Exception {
        Reply reply = new Reply();
        reply.setBoardNo(boardNo);
        reply.setReplyContent(replyContent);
        reply.setUserNo(userNo);

        replyService.insert(reply);

        return ResponseEntity.ok("Reply added successfully");
    }

    @PostMapping("/replies/{parentNo}")
    public ResponseEntity<String> insertReplyReply(@RequestParam("boardNo") int boardNo, @RequestParam("replyContent") String replyContent, @RequestParam("userNo") int userNo, @PathVariable int parentNo) throws Exception {
        Reply reply = new Reply();
        reply.setBoardNo(boardNo);
        reply.setReplyContent(replyContent);
        reply.setUserNo(userNo);
        reply.setParentNo(parentNo);

        replyService.insert(reply);

        return ResponseEntity.ok("Reply reply added successfully");
    }

    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
    }
}