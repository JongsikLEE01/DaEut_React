package com.aloha.server.tip.service;

import java.util.List;

import com.aloha.server.tip.dto.Reply;

public interface ReplyService {
    
    public List<Reply> list() throws Exception;

    public List<Reply> listByBoardNo(int boardNo) throws Exception;

    public Reply select(int replyNo) throws Exception;

    public int insert(Reply reply) throws Exception;

    public int update(Reply reply) throws Exception;

    public int delete(int replyNo) throws Exception;

    public int deleteByBoardNo(int boardNo) throws Exception;

    public int max() throws Exception;

    public int deleteByParentNo(int parentNo) throws Exception;

    public int countByBoardNo(int boardNo) throws Exception;
}
