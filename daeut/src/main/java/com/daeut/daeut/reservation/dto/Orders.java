package com.daeut.daeut.reservation.dto;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.daeut.daeut.auth.dto.Users;
import com.daeut.daeut.partner.dto.Partner;

import lombok.Data;

@Data
public class Orders {
    private String ordersNo;
    private String title;
    private int userNo;
    private int totalQuantity = 1;
    private int totalCount = 1;
    private int totalPrice = 0;
    private OrderStatus orderStatus;
    private Date updDate;
    private Date regDate;
    private int partnerNo;

    // params
    private List<String> serviceNo;
    private List<Integer> quantity;

    // ----
    private Users user;
    private Partner partner;
    private Services service;
    private String userName;
    private String userAddress;
    private String userPhone;
    private String serviceName;
    private String partnerName;


    private PaymentStatus status; 
    @DateTimeFormat(pattern = "yyyy-MM-dd")

    private Date serviceDate; 
    private Payments payment;
    private String serviceAddress;

}
