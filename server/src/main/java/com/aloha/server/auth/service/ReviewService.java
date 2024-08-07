package com.aloha.server.auth.service;

import com.aloha.server.auth.dto.Review;
import com.aloha.server.reservation.dto.Payments;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ReviewService {

    public List<Payments> getUserPayments(int userNo);

    public Payments getPaymentDetails(int paymentNo);
    
    public void saveReview(Review review, MultipartFile[] files) throws Exception;

    public List<Review> getReviewByServiceNo(int serviceNo);

    public int getAverageRatingByServiceNo(@Param("serviceNo") int serviceNo);

    public int reviewDelete(int userNo)throws Exception;

}
