package com.aloha.server.partner.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aloha.server.auth.dto.Review;
import com.aloha.server.auth.dto.Users;
import com.aloha.server.auth.service.UserService;
import com.aloha.server.partner.dto.Partner;
import com.aloha.server.partner.mapper.PartnerMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PartnerServiceImpl implements PartnerService {

    @Autowired
    private PartnerMapper partnerMapper;

    @Autowired
    private UserService userService;

    public PartnerServiceImpl(PartnerMapper partnerMapper) {
        this.partnerMapper = partnerMapper;
    }


    // 파트너 정보 가져오기
    @Override
    public Partner getPartners(int userNo) throws Exception {
        try {
            Partner partner = partnerMapper.getPartners(userNo);
            return partner;
        } catch (Exception e) {
            // 에러 로그 기록
            log.error("Error while fetching partners for userNo: {}", userNo, e);
            throw e;
        }
    }

    // 파트너 정보 수정
    @Override
    public int partnerUpdate(Partner partner) throws Exception {
        int result = partnerMapper.partnerUpdate(partner);

        return result;
    }

    // @Override
    // @Transactional
    // public int partnerUpdate(Partner partner, Users user) throws Exception {
    //     int userUpdateResult = userService.update(user);
    //     int partnerUpdateResult = partnerMapper.partnerUpdate(partner);
     
    
    //     // 둘 중 하나라도 실패하면 실패로 처리하기
    //     int result = userUpdateResult + partnerUpdateResult;
    
    //     return result;
    // }

    // 리뷰 모아보기
    @Override
    public List<Review> getReviews(int partnerNo) throws Exception {
        return partnerMapper.getReviews(partnerNo);
    }

    @Override
    public Partner findByUserNo(int userNo) throws Exception {
        return partnerMapper.findByUserNo(userNo);
    }

    @Override
    public Partner selectByPartnerNo(int partnerNo) throws Exception {
        return partnerMapper.selectByPartnerNo(partnerNo);
    }

    @Override
    public Partner select(int partnerNo) throws Exception {
        return partnerMapper.select(partnerNo);
    }

    @Override
    public Users getPartnerName(int partnerNo) throws Exception {
        Partner partner = select(partnerNo);
        int userNo = partner.getUserNo();
        Users uPartner = userService.findUserById(userNo);

        return uPartner;
    }

    @Override
    public String selectUserNameByPartnerNo(int partnerNo) {
        return partnerMapper.selectUserNameByPartnerNo(partnerNo);
    }
    
    // 날짜 가져오기
    @Override
    public List<String> getPartnerSchedule(String partnerNo) {
        return partnerMapper.getPartnerSchedule(partnerNo);
    }
    
}
