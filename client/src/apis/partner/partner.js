import axios from "axios"

// 파트너 정보 조회
export const partnerList = (userNo) => axios.get(`/partner/partnerList/${userNo}`)

// 파트너 정보 수정
export const updatePartnerInfo = (data) => axios.put(`/partner/update`, data);

// 파트너 리뷰 조회
export const PartnerReviews = (partnerNo) => axios.get(`/partner/reviews/${partnerNo}`);

// 파트너 예약 조회
export const getPartnerReservations = (partnerNo) => axios.get(`/partner/reservations/${partnerNo}`);

// 파트너 예약 상세 조회
export const getpartnerReservationRead = (ordersNo) => axios.get(`/partner/${ordersNo}`);

// 파트너 탈퇴
export const deletePartner = (userNo) => axios.delete(`/partner/delete/${userNo}`);