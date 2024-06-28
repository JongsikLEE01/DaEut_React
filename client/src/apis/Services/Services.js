import axios from "axios"

// Service Axios
export const list = () => axios.get("/reservation")
export const select = (serviceNo) => axios.get(`/reservation/${serviceNo}`)
export const insert = (formData, headers) => axios.post(`/reservation`, formData, headers)
export const update = (formData, headers) => axios.put(`/reservation`, formData, headers)
export const remove =  (serviceNo) => axios.delete(`/reservation/${serviceNo}`)