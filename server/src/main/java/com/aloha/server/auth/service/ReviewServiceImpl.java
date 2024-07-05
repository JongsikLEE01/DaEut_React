package com.aloha.server.auth.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.auth.dto.Review;
import com.aloha.server.auth.mapper.ReviewMapper;
import com.aloha.server.main.dto.Files;
import com.aloha.server.main.service.FileService;
import com.aloha.server.reservation.dto.Payments;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewMapper reviewMapper;

    @Autowired
    private FileService fileService;

    @Override
    public List<Payments> getUserPayments(int userNo) {
        return reviewMapper.findPaymentsByUserNo(userNo);
    }

    public Payments getPaymentDetails(int paymentNo) {
        return reviewMapper.getPaymentDetails(paymentNo);
    }

    @Override
    public void saveReview(Review review, MultipartFile[] files) throws Exception {
        String parentTable = "review";
        int parentNo = reviewMapper.maxPk() + 1;

        // 리뷰 데이터 삽입
        review.setReviewNo(parentNo);
        reviewMapper.insertReview(review);
            
        // 파일 업로드
        if (files != null && files.length > 0) {
            Files fileInfo = new Files();
            fileInfo.setParentTable(parentTable);
            fileInfo.setParentNo(parentNo);
            List<MultipartFile> fileList = Arrays.asList(files);

            List<Files> uploadedFileList = fileService.uploadFiles(fileInfo, fileList);
            if (uploadedFileList == null || uploadedFileList.isEmpty()) {
                log.info("파일 업로드 실패...");
            } else {
                log.info("파일 업로드 성공...");
                log.info(uploadedFileList.toString());
            }
        } else {
            log.info("첨부 파일 없음...");
        }
    }

    @Override
    public List<Review> getReviewByServiceNo(int serviceNo) {
       return reviewMapper.getReviewByServiceNo(serviceNo);
    }


    @Override
    public int getAverageRatingByServiceNo(int serviceNo) {
       return reviewMapper.getAverageRatingByServiceNo(serviceNo);
    }

    // 리뷰 삭제
    @Override
    public int reviewDelete(int userNo) throws Exception {
       return reviewMapper.reviewDelete(userNo);
    }

}
