package com.aloha.server.tip.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.server.tip.dto.Reply;

@Mapper
public interface ReplyMapper {
    
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
