import axios from "axios"

// Service Axios
export const list = () => axios.get("/reservation")
export const select = (serviceNo) => axios.get(`/reservation/${serviceNo}`)
export const update = () => axios.put(`/reservation`)
export const remove =  () => axios.delete(`/reservation`)