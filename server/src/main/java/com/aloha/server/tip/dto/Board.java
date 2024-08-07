package com.aloha.server.tip.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.main.dto.Files;

import lombok.Data;

@Data
public class Board {
    private int boardNo;
    private String boardTitle;
    private String boardContent;
    private Date boardRegDate;
    private Date boardUpdDate;
    private int boardViews;
    private int boardLike;
    private int userNo;
    private String userId;
    private int replyCount;

    // 썸네일 이미지 파일
    MultipartFile thumbnail;

    // 파일
    List<MultipartFile> file;

    // 파일 번호
    private int fileNo;

    // private List<Integer> likedUsers;

    // 파일 목록 추가
    private List<Files> fileList;
    
}
