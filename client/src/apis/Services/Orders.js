import axios from "axios"

// Order Axios
export const addOrder = (userNo, serviceNo, quantity) => axios.post(`/orders`, {userNo, serviceNo, quantity})
export const getOrder = (ordersNo) => axios.get(`/orders/${ordersNo}`)
export const payDone = (ordersNo, date, time, userAddress, userPost) => axios.get(`/orders/success`,{ params: { ordersNo, date, time, userAddress, userPost }})
export const payFalse = (ordersNo, date, time, userAddress, userPost, errorMsg) => axios.get(`/orders/fail`, { params: { ordersNo, date, time, userAddress, userPost, errorMsg }})
export const payCancel = (ordersNo, cancelAccount, cancelName, cancelNumber, reason) => axios.post(`/orders/cancel`, null,{ params: { ordersNo, cancelAccount, cancelName, cancelNumber, reason }})
export const getCancel = (ordersNo) => axios.post('/user/cancelDone', null, { params: { ordersNo }})