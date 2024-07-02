import axios from "axios"

// Order Axios
export const addOrder = (userNo, serviceNo, quantity) => axios.post(`/orders`, {userNo, serviceNo, quantity})
export const addPayment = (ordersNo) => axios.get(`/orders/${ordersNo}`)