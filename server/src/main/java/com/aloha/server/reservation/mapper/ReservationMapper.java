package com.aloha.server.reservation.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.aloha.server.main.dto.Files;
import com.aloha.server.main.dto.Option;
import com.aloha.server.main.dto.ServicePage;
import com.aloha.server.reservation.dto.Event;
import com.aloha.server.reservation.dto.Services;

@Mapper
public interface ReservationMapper {
    // 목록
    public List<Services> serviceList(@Param("servicePage") ServicePage servicePage, @Param("option") Option option) throws Exception;
    // 단일 조회
    public Services serviceSelect(int serviceNo) throws Exception;
    // 단일 조회 수정 X
    public Services select(int serviceNo) throws Exception;
    // 삽입
    public int serviceInsert(Services service) throws Exception;
    // 업데이트
    public int serviceUpdate(Services service) throws Exception;
    // 삭제
    public int serviceDelete(int serviceNo) throws Exception;
    // 검색
    public List<Services> search(@Param("option") Option option) throws Exception;
    // 최댓값을 조회
    public int maxPk() throws Exception;
    // 개수 조회
    public int count(@Param("option") Option option) throws Exception;

    // 썸네일
    public Files SelectThumbnail(int serviceNo) throws Exception;
    // 설명 파일
    public List<Files> SelectFiles(int serviceNo) throws Exception;

    // 파트너 썸네일
    public Files partnerThumbnail(int partnerNo) throws Exception;

    // 달력 리스트
    List<Event> calendarListByServiceNo(int serviceNo) throws Exception;

    // 리뷰 이미지
    public Files getFileByServiceNum (int serviceNo) throws Exception;

}