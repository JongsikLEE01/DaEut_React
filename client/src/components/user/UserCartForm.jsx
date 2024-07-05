// UserCartForm.js
import React, { useContext } from 'react'
import * as Swal from '../../apis/alert'
import { LoginContext } from '../contexts/LoginContextProvider'

const UserCartForm = ({ cartList, onDeleteSelected, onDeleteAll, onOrderSelected }) => {
  const { userInfo } = useContext(LoginContext)

  const handleDeleteSelected = () => {
    const CartNos = Array.from(document.querySelectorAll('.checkbox:checked')).map(checkbox => checkbox.value)
    if (CartNos.length === 0) {
      Swal.alert('장바구니 삭제 실패', '삭제할 서비스를 선택하고 삭제해주세요!', 'error')
      return
    }
    console.log(CartNos);
    onDeleteSelected(CartNos)
  }

  const handleDeleteAll = () => {
    Swal.confirm('정말 삭제하시겠습니까?', '지금 장바구니를 비울 경우 장바구니에 저장된 모든 서비스가 사라집니다.', 'warning',(result) => {
      // isConfirmed : 확인 버튼 클릭 여부
      if(result.isConfirmed){
        const userNo = userInfo.userNo
        console.log(userNo);
        onDeleteAll(userNo)
      }
    })
  }

  const handleOrderSelected = () => {
    const CartNos = Array.from(document.querySelectorAll('.checkbox:checked')).map(checkbox => checkbox.value)
    if (CartNos.length === 0) {
      Swal.alert('선택 주문 실패', '주문할 서비스를 선택하고 주문해주세요!', 'error')
      return
    }
    onOrderSelected(CartNos)
  }


  return (
    <div className="col-md-9 col-lg-10 form-section" id="cartSection">
      <h3>장바구니</h3>
      <p>회원님의 집을 책임 질 파트너를 골라주세요</p>
      <p>총 {cartList.length}건이 장바구니에 담겨있어요</p>
      <br />
      <table className="table table-sm table-hover">
        <thead className="table-light">
          <tr>
            <th></th>
            <th>번호</th>
            <th>서비스명</th>
            <th>파트너명</th>
            <th>내가 담은 날짜</th>
          </tr>
        </thead>
        <tbody>
          {cartList.length === 0 ? (
            <tr>
              <td colSpan="5">장바구니가 비어있어요</td>
            </tr>
          ) : (
            cartList.map((cart, index) => (
              <tr key={cart.cartNo}>
                <td className="checked">
                  <input type="checkbox" className="checkbox" value={cart.cartNo} />
                </td>
                <td>{index + 1}</td>
                <td>{cart.serviceName}</td>
                <td>{cart.partnerName}</td>
                <td>{new Date(cart.cartRegDate).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="buttons">
        <button className="btn btn-danger" onClick={handleDeleteSelected}>선택 삭제</button>
        <button className="btn btn-danger" onClick={handleDeleteAll}>전체 삭제</button>
        <button className="btn btn-primary custom2" onClick={handleOrderSelected}>구매하기</button>
      </div>
    </div>
  )
}

export default UserCartForm
