package com.aloha.server.tip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.main.dto.Files;
import com.aloha.server.tip.dto.Option2;
import com.aloha.server.main.dto.Page;
import com.aloha.server.main.service.FileService;
import com.aloha.server.tip.dto.Board;
import com.aloha.server.tip.mapper.BoardMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;

    @Autowired
    private FileService fileService;

    @Autowired
    private ReplyService replyService;

    private static final int THUMBNAIL_FILE_CODE = 1;

    // 게시글 목록 조회
    @Override
    public List<Board> list(Page page, Option2 option, String sort) throws Exception {
        int total = boardMapper.count(option);
        page.setTotal(total);

        List<Board> boardList = boardMapper.list(page, option, sort);
        
        for (Board board : boardList) {
            Files fileCriteria = new Files();
            fileCriteria.setParentTable("board");
            fileCriteria.setParentNo(board.getBoardNo());
            List<Files> fileList = fileService.listByParent(fileCriteria);
            board.setFileList(fileList);
        }

        log.info("::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        log.info("boardList : " + boardList);
        return boardList;
    }

    // 게시글 조회
    @Override
    public Board select(int boardNo) throws Exception {
        Board board = boardMapper.select(boardNo);
        
        // 파일 목록 조회
        Files fileCriteria = new Files();
        fileCriteria.setParentTable("board");
        fileCriteria.setParentNo(boardNo);
        List<Files> fileList = fileService.listByParent(fileCriteria);
        board.setFileList(fileList);
        
        return board;
    }

    // 게시글 등록
    @Override
    public int insert(Board board) throws Exception {
        int result = boardMapper.insert(board);

        String parentTable = "board";
        int parentNo = boardMapper.maxPk();

        // 썸네일 파일 업로드
        MultipartFile thumbnailFile = board.getThumbnail();
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            log.info("썸네일 파일 이름 : " + thumbnailFile.getOriginalFilename());
            Files thumbnail = new Files();
            thumbnail.setFile(thumbnailFile);
            thumbnail.setParentTable(parentTable);
            thumbnail.setParentNo(parentNo);
            thumbnail.setFileCode(THUMBNAIL_FILE_CODE);
            fileService.upload(thumbnail);
        }

        // 일반 파일 업로드
        List<MultipartFile> fileList = board.getFile();
        if (fileList != null && !fileList.isEmpty()) {
            for (MultipartFile file : fileList) {
                if (!file.isEmpty()) {
                    log.info("file : " + file.getOriginalFilename());

                    Files uploadFile = new Files();
                    uploadFile.setParentTable(parentTable);
                    uploadFile.setParentNo(parentNo);
                    uploadFile.setFile(file);
                    fileService.upload(uploadFile);
                }
            }
        }

        return result;
    }

    // 게시글 수정
    @Override
    public int update(Board board) throws Exception {
        int result = boardMapper.update(board);

        String parentTable = "board";
        int parentNo = board.getBoardNo();

        // 썸네일 파일 업로드
        MultipartFile thumbnailFile = board.getThumbnail();
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {
            log.info("썸네일 파일 이름 : " + thumbnailFile.getOriginalFilename());
            Files thumbnail = new Files();
            thumbnail.setFile(thumbnailFile);
            thumbnail.setParentTable(parentTable);
            thumbnail.setParentNo(parentNo);
            thumbnail.setFileCode(THUMBNAIL_FILE_CODE);
            fileService.upload(thumbnail);
        }

        // 일반 파일 업로드
        List<MultipartFile> fileList = board.getFile();
        if (fileList != null && !fileList.isEmpty()) {
            for (MultipartFile file : fileList) {
                if (!file.isEmpty()) {
                    log.info("file : " + file.getOriginalFilename());

                    Files uploadFile = new Files();
                    uploadFile.setParentTable(parentTable);
                    uploadFile.setParentNo(parentNo);
                    uploadFile.setFile(file);
                    fileService.upload(uploadFile);
                }
            }
        }

        return result;
    }

    // 게시글 삭제
    @Override
    public int delete(int boardNo) throws Exception {
        int result = boardMapper.delete(boardNo);
        if( result > 0 ){
            result += replyService.deleteByBoardNo(boardNo);
        }
        return result;
    }

    @Override
    public int view(int boardNo) throws Exception {
        log.info(boardNo + "번 글 조회수 증가");
        return boardMapper.view(boardNo);
    }

    @Override
    public List<Board> search(Option2 option) throws Exception {
        List<Board> boardList = boardMapper.search(option);
        return boardList;
    }

    @Override
    public void incrementBoardLike(int boardNo, int userNo) throws Exception {
        log.info(boardNo + "번 글 좋아요 수 증가");
        boardMapper.incrementBoardLike(boardNo);
    }

    @Override
    public Files SelectThumbnail(int boardNo) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'SelectThumbnail'");
    }

    @Override
    public List<Files> SelectFiles(int boardNo) throws Exception {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'SelectFiles'");
    }

    // @Override
    // public List<Board> getTop5BoardsByBoardViews() {
    //     return boardMapper.findTop5ByBoardViews();
    // }
}
