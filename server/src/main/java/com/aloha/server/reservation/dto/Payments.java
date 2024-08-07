package com.aloha.server.reservation.dto;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class Payments {
    private int paymentNo;
    private String paymentMethod;
    private PaymentStatus status;
    private Date payDate;
    private Date regDate;
    private Date updDate;
    private String ordersNo;


    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date serviceDate;
    private String title;
    private String serviceAddress;
    private String serviceName;
    private int serviceNo;
    private int partnerNo;
}
