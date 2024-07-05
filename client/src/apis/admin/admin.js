import axios from 'axios';
import api from '../api'

// 회원 목록
export const getAllUsers = async (page = 1) => api.get('/admin/adminUser', { params: { page } })

// 회원 선택 삭제
export const deleteSelectedUsers = async (deleteNoList) => api.post('/admin/user/delete', deleteNoList)

// 특정 사용자 및 리뷰 정보 가져오기
export const getUserAndReviews = async (userNo) => api.get(`/admin/adminUserRead/${userNo}`);

// 사용자 리뷰 삭제
export const deleteReview =(reviewNo) => axios.delete(`/admin/adminReviewDelete/${reviewNo}`)

// 사용자 수정 화면
export const updateUser = (userNo) => axios.get(`/admin/adminUserUpdate/${userNo}`)

// 사용자 수정 처리
export const updateUserDetails = async (userNo, user) => api.put(`/admin/adminUserUpdate/${userNo}`, user)

// 사용자 삭제
export const deleteUser = async (userNo) => api.delete('/admin/adminUserDelete', { params: { userNo } })

// 파트너 목록
export const getAllPartners = async (page = 1) => api.get('/admin/adminPartner', { params: { page } })

// 파트너 조회
export const getPartner = async (userNo) => api.get(`/admin/adminPartnerRead/${userNo}`);

// 파트너 승인
export const approvePartner  = async (userId) => api.post(`/admin/approvePartner/${userId}`)

// 파트너 승인 취소
export const cancelPartnerApproval = async (userId) => api.post(`/admin/cancelPartner/${userId}`)


// 예약 목록 조회
export const getReservations = async (page = 1) => api.get('/admin/adminReservation', { params: { page } })

// 특정 예약 조회
export const getReservationDetails = async (ordersNo) => api.get(`/admin/adminReservationRead/${ordersNo}`)

// 예약 수정
export const updateReservation = (ordersNo) => api.get(`/admin/adminReservationUpdate/${ordersNo}`);

// 예약 수정 처리
export const updateReservationDetails = async (ordersNo, userNo, userName, title, totalPrice, serviceAddress, serviceDay, serviceTime) => {
    return axios.put(`/admin/adminReservationUpdate`, null, {
      params: {
        ordersNo,
        userNo,
        userName,
        title,
        totalPrice,
        serviceAddress,
        serviceDay,
        serviceTime
      }
    });
  }