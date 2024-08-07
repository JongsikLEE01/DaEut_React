package com.aloha.server.reservation.service;

import java.util.List;

import com.aloha.server.reservation.dto.Cancel;

public interface CancelService {
    public List<Cancel> list() throws Exception;
    public Cancel select(int cancelNo) throws Exception;
    public Cancel selectByOrdersNo(String ordersNo) throws Exception;
    public int insert(Cancel cancel) throws Exception;
    public int update(Cancel cancel) throws Exception;
    public int delete(int cancelNo) throws Exception;
}
