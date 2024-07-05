import axios from "axios"

// Service Axios
export const list = (page, keyword) => axios.get(`/reservation?page=${page}&keyword=${keyword}`);
export const select = (serviceNo) => axios.get(`/reservation/${serviceNo}`)
export const insert = (formData, headers) => axios.post(`/reservation`, formData, headers)
export const update = (formData, headers) => axios.put(`/reservation`, formData, headers)
export const remove =  (serviceNo) => axios.delete(`/reservation/${serviceNo}`)

// Cart Axios
export const selectCart = (userNo) => axios.get(`/cart/${userNo}`)
export const addCart = (userNo, serviceNo) => axios.post(`/cart`, {userNo, serviceNo})
export const removeCart = (cartNos) => axios.delete(`/cart`, { cartNos })
export const removeCartAll = (userNo) => axios.delete(`/cart/${userNo}`)

// Chat Axios
export const addChatRoom = (partnerNo, userInfo) => axios.post(`/user/userChatRoom/${partnerNo}`, userInfo)
export const selectChatData = (roomNo, userInfo) => axios.get(`/chat`, {params : {roomNo}}, userInfo)


// 캘린더
export const Calendar = (serviceNo) => axios.get(`/full-calendar/events`, {params : {serviceNo}})