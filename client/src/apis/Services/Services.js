import axios from "axios"

// Service Axios
export const list = (page, keyword) => axios.get(`/reservation?page=${page}&keyword=${keyword}`);
export const select = (serviceNo) => axios.get(`/reservation/${serviceNo}`)
export const insert = (formData, headers) => axios.post(`/reservation`, formData, headers)
export const update = (formData, headers) => axios.put(`/reservation`, formData, headers)
export const remove =  (serviceNo) => axios.delete(`/reservation/${serviceNo}`)

// Cart Axios
export const addCart = (userNo, serviceNo) => axios.post(`/cart`, {userNo, serviceNo})

// Chat Axios
export const addChatRoom = (partnerNo) => axios.post(`/user/userChatRoom`, {params : {partnerNo}})
export const selectChatData = (roomNo, userInfo) => axios.get(`/chat`, {params : {roomNo}}, userInfo)

// 캘린더
export const Calendar = (serviceNo) => axios.get(`/full-calendar/events`, {params : {serviceNo}})

// 리뷰