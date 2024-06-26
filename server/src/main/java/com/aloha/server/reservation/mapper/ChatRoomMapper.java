package com.aloha.server.reservation.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.server.reservation.dto.ChatRooms;

@Mapper
public interface ChatRoomMapper {
    public List<ChatRooms> list() throws Exception;
    public ChatRooms select(String roomNo) throws Exception;
    public List<ChatRooms> selectByUserNo(int userNo) throws Exception;
    public List<ChatRooms> selectByPartnerNo(int partnerNo) throws Exception;
    public int insert(ChatRooms chatRooms) throws Exception;
    public int update(ChatRooms chatRooms) throws Exception;
    public int delete(String roomNo) throws Exception;
}