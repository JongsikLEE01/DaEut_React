package com.aloha.server.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.auth.dto.Review;
import com.aloha.server.auth.mapper.ReviewMapper;
import com.aloha.server.main.dto.Files;
import com.aloha.server.main.service.FileService;
import com.aloha.server.reservation.dto.Payments;

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
    public void saveReview(Review review) throws Exception {
        String parentTable = "review";
        int parentNo = reviewMapper.maxPk() + 1;
           
        // 파일 업로드
        List<MultipartFile> fileList = review.getFile();
        if( !fileList.isEmpty() ){
            for (MultipartFile file : fileList) {
                if (file.isEmpty()) continue;

                // 파일 정보 등록
                Files  uploadFile = new Files();
                uploadFile.setParentTable(parentTable);
                uploadFile.setParentNo(parentNo);
                uploadFile.setFile(file);
                uploadFile.setFileCode(0);
                fileService.upload(uploadFile);
            }
        }

        reviewMapper.insertReview(review);
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
