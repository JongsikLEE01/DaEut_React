import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserLayout from '../../layouts/UserLayout';
import Sidebar from '../../components/static/Sidebar';
import '../../components/user/user.css';

const UserCart = () => {
    const [cartList, setCartList] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // 하드코딩된 사용자 데이터
        const hardcodedCartList = [
            {
                cartNo: 1,
                serviceNo: 101,
                serviceName: '청소 서비스',
                partnerName: '파트너1',
                cartRegDate: '2023-07-01T00:00:00',
            },
            {
                cartNo: 2,
                serviceNo: 102,
                serviceName: '정리 서비스',
                partnerName: '파트너2',
                cartRegDate: '2023-07-02T00:00:00',
            }
        ];
        setCartList(hardcodedCartList);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleOrderSelectedCarts = () => {
        const selectedCartNos = cartList
            .filter(cart => document.getElementById(`chk${cart.cartNo}`).checked)
            .map(cart => cart.cartNo);

        if (selectedCartNos.length === 0) {
            alert('선택된 제품이 없어요');
            return;
        }

        // 선택된 제품들을 서버로 전송하는 로직 추가
        console.log('주문할 제품 번호: ', selectedCartNos);
    };

    const handleDeleteSelectedCarts = () => {
        const selectedCartNos = cartList
            .filter(cart => document.getElementById(`chk${cart.cartNo}`).checked)
            .map(cart => cart.cartNo);

        if (selectedCartNos.length === 0) {
            alert('선택된 제품이 없어요');
            return;
        }

        // 선택된 제품들을 서버로 전송하여 삭제하는 로직 추가
        console.log('삭제할 제품 번호: ', selectedCartNos);
    };

    const handleDeleteAllCarts = () => {
        // 모든 장바구니 항목을 서버로 전송하여 삭제하는 로직 추가
        console.log('모든 장바구니 항목 삭제');
    };

    return (
        <UserLayout>
            <button className="btn btn-primary toggle-btn menu mt-2 ml-2" id="toggle-btn" onClick={toggleSidebar}>메뉴</button>
            <div className="container-fluid container">
                <div className="row">
                    <div className="col-md-9 col-lg-10 form-section" id="cartSection">
                        <h3>장바구니</h3>
                        <p>회원님의 집을 책임 질 파트너를 골라주세요</p>
                        <p>총 {cartList.length}건이 장바구니에 담겨있어요</p>
                        <br />
                        <table className="table table-sm table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th></th>
                                    <th>No.</th>
                                    <th>서비스</th>
                                    <th>파트너</th>
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
                                                <input type="checkbox" id={`chk${cart.cartNo}`} className="checkbox" name="cartNos" value={cart.cartNo} />
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
                            <button className="btn btn-danger" onClick={handleDeleteSelectedCarts}>선택 삭제</button>
                            <button className="btn btn-danger" onClick={handleDeleteAllCarts}>전체 삭제</button>
                            <button className="btn btn-primary custom2" onClick={handleOrderSelectedCarts}>구매하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserCart;
