import api from '../api';

export const getUserInfo = () => api.get('/user/userMypage')

export const updateUserInfo = (data) => {
  return api.put('/user/userMypageUpdateDone', data, {
    params: {
      action: 'update',
    },
  })
}

export const getUserReservations = () => api.get('/user/userReservation')

export const getUserPaymentsAndReview = () => api.get('/user/userReview')
 
export const submitUserReview = (formData) => {
  return api.post('/user/userReviewDone', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
 
export const getUserChatRooms = () => api.get('/user/userChatRoom')

export const getUserPartnerDetails = () => api.get('/user/userPartner')

export const submitPartnerRequest = (formData) => api.post('/user/request-partner', formData)
