package com.aloha.server.reservation.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.server.reservation.dto.Chats;

@Mapper
public interface ChatMapper {
    public List<Chats> list() throws Exception;
    public Chats select(int chatNo) throws Exception;
    public List<Chats> selectByRoomNo(String roomNo) throws Exception;
    public int insert(Chats chats) throws Exception;
    public int update(Chats chats) throws Exception;
    public int delete(int chatNo) throws Exception;
}
