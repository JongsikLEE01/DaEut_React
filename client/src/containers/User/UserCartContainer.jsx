import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCartForm from '../../components/user/UserCartForm';

const UserCartContainer = () => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    // 장바구니 데이터를 API에서 가져옴
    const fetchCartList = async () => {
      try {
        const response = await axios.get('/cart');
        setCartList(response.data);
      } catch (error) {
        console.error('Error fetching cart list:', error);
      }
    };
    fetchCartList();
  }, []);

  const handleDeleteSelected = async (selectedCartNos) => {
    try {
      await axios.delete('/cart/delete', { data: { cartNos: selectedCartNos } });
      setCartList(cartList.filter(cart => !selectedCartNos.includes(cart.cartNo)));
    } catch (error) {
      console.error('Error deleting selected carts:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete('/cart/delete/all');
      setCartList([]);
    } catch (error) {
      console.error('Error deleting all carts:', error);
    }
  };

  const handleOrderSelected = async (selectedCartNos) => {
    try {
      await axios.post('/orders', { cartNos: selectedCartNos });
      setCartList(cartList.filter(cart => !selectedCartNos.includes(cart.cartNo)));
    } catch (error) {
      console.error('Error ordering selected carts:', error);
    }
  };

  return (
    <UserCartForm 
      cartList={cartList} 
      onDeleteSelected={handleDeleteSelected} 
      onDeleteAll={handleDeleteAll} 
      onOrderSelected={handleOrderSelected} 
    />
  );
};

export default UserCartContainer;
