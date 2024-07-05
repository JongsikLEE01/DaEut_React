import React, { useState, useEffect, useContext } from 'react'
import * as Swal from '../../apis/alert'
import UserCartForm from '../../components/user/UserCartForm'
import * as service from '../../apis/Services/Services'
import * as Orders from '../../apis/Services/Orders'
import { LoginContext } from '../../components/contexts/LoginContextProvider'
import { useNavigate } from 'react-router-dom'


const UserCartContainer = () => {
  const [cartList, setCartList] = useState([])
  const { userInfo } = useContext(LoginContext)
  const navigate = useNavigate()

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
      
      getCartList(userInfo.userNo)
      console.log(`선택 삭제 결과... ${status}`)
    } catch (e) {
      Swal.alert('삭제 실패', '서비스를 장바구니에서 삭제하는 중 오류가 발생했습니다', 'error')
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
      Swal.alert('장바구니 비우기', '장바구니를 비우는 중 오류가 발생했습니다', 'error')
      console.error('장바구니 전체 삭제 중 에러 발생...', e)
    }
  }

// 선택 주문
const onOrderSelected = async (cartNos) => {
  console.log(cartNos);
  try {
    const response = await Orders.addOrders(
      userInfo.userNo,                        // 사용자 번호
      cartNos.map(cart => cart.serviceNo),    // 서비스 번호 리스트
      cartNos.map(cart => cart.quantity)      // 수량 리스트
    )
    const data = response.data
    const status = response.status
    const ordersNo = data.ordersNo

    console.log('주문 결과...', status)
    navigate(`/order/${ordersNo}`)
  } catch (error) {
    Swal.alert('주문 실패', '주문을 처리하는 중 오류가 발생했습니다', 'error');
    console.error('선택 주문 중 오류 발생...', error);
  }
}

  

  useEffect(() => {
    if(userInfo){
      const userNo = userInfo.userNo
      getCartList(userNo)
    }
  // }, [cartList])
  }, [])

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
