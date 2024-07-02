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
