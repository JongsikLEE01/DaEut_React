package com.aloha.server.reservation.service;

import java.util.List;

import com.aloha.server.reservation.dto.Orders;

public interface OrderService {
    public List<Orders> list() throws Exception;

    public Orders select(String ordersNo) throws Exception;

    public int insert(Orders orders) throws Exception;

    public int update(Orders orders) throws Exception;

    public int updateData(Orders orderes) throws Exception;

    public int delete(String ordersNo) throws Exception;

    // ---------------------------------------------------------
    public List<Orders> listByUserNo(int userNo) throws Exception;

    public List<Orders> listByPartnerNo(int partnerNo) throws Exception;

    public Orders listByOrderNo(String ordersNo) throws Exception;

    public void OrdersDelete(String ordersNo) throws Exception;

}
