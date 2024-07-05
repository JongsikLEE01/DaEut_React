package com.aloha.server.auth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.aloha.server.auth.dto.Review;
import com.aloha.server.reservation.dto.Payments;

@Mapper
public interface ReviewMapper {

    public List<Payments> findPaymentsByUserNo(@Param("userNo") int userNo);

    public Payments getPaymentDetails(int paymentNo);

    public void insertReview(Review review);

    public List<Review> getReviewByServiceNo(@Param("serviceNo")int serviceNo);

    public int getAverageRatingByServiceNo(@Param("serviceNo") int serviceNo);

    public int reviewDelete(int userNo) throws Exception;

    public int maxPk();

}
