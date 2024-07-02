package com.aloha.server.reservation.service;

import java.util.List;

import com.aloha.server.reservation.dto.Cart;

public interface CartService {
    public List<Cart> cartList(int userNo) throws Exception;
    public int cartInsert(Cart cart) throws Exception;
    public int cartUpdate(Cart cart) throws Exception;
    public int cartDeleteSelected(List<Integer> cartNos) throws Exception;
    public int cartDeleteAll(int userNo) throws Exception;
    public int cartDelete(int cartNo) throws Exception;
    public int deleteByOrderComplete(List<Integer> serviceNoList, int userNo) throws Exception;
}
