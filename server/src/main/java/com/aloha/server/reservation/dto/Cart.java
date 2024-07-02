package com.aloha.server.reservation.dto;

import java.util.Date;
import lombok.Data;

@Data
public class Cart {
    private int cartNo;
    private int cartAmount;
    private Date cartRegDate;
    private Date cartUpdDate;
    private int userNo;
    private int serviceNo;
    
    private String userName;
    private String serviceName;
    private String partnerName;
}
