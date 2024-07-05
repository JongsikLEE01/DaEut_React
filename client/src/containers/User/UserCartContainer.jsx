import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UserCartForm from '../../components/user/UserCartForm'
import * as service from '../../apis/Services/Services'
import { LoginContext } from '../../components/contexts/LoginContextProvider'

const UserCartContainer = () => {
  const [cartList, setCartList] = useState([])
  const { userInfo } = useContext(LoginContext)

  // 장바구니 가져오기
  const getCartList = async (userNo) => {
    try {
      const response = await service.selectCart(userNo)
      const data = response.data
      // console.log(data)

      setCartList(data)
    } catch (e) {
      console.error('장바구니 조회중 에러 발생... ', e)
    }
  }

  // 선택 삭제
  const onDeleteSelected = async (cartNos) => {
    try {
      const response = await service.removeCart(cartNos)
      const status = response.status
      // setCartList(cartList.filter(cart => !selectedCartNos.includes(cart.cartNo)))
      console.log(`선택 삭제 결과... ${status}`)
    } catch (e) {
      console.error('선택 삭제 중 에러 발생...', e)
    }
  }

  // 전체 삭제
  const onDeleteAll = async (userNo) => {
    try {
      const response = await service.removeCartAll(userNo)
      const status = response.status
      console.log(`장바구니 전체 삭제 결과... ${status}`)
      setCartList([])
    } catch (e) {
      console.error('장바구니 전체 삭제 중 에러 발생...', e)
    }
  }

  // 선택 주문
  const onOrderSelected = async (CartNos) => {
    try {
      await axios.post('/orders', { cartNos: CartNos })
      // setCartList(cartList.filter(cart => !CartNos.includes(cart.cartNo)))
    } catch (error) {
      console.error('선택 주문중 오류 발생...', error)
    }
  }

  useEffect(() => {
    if(userInfo){
      const userNo = userInfo.userNo
      getCartList(userNo)
    }
  }, [cartList])

  return (
    <UserCartForm 
      cartList={cartList} 
      onDeleteSelected={onDeleteSelected} 
      onDeleteAll={onDeleteAll} 
      onOrderSelected={onOrderSelected} 
    />
  )
}

export default UserCartContainer
