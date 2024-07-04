import api from '../api';
import Cookies from 'js-cookie';

export const getUserInfo = () => api.get('/user/userMypage');

export const updateUserInfo = (data) => {
  const token = Cookies.get('accessToken');
  if (!token) {
    console.error('No access token found');
    return Promise.reject(new Error('No access token found'));
  }

  return api.put('/user/userMypageUpdateDone', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserReservations = () => api.get('/user/userReservation');

export const getUserPaymentsAndReview = () => {
  const token = Cookies.get('accessToken');
  if (!token) {
    return Promise.reject(new Error('No access token found'));
  }

  return api.get('/user/userReview', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const submitUserReview = (reviewData) => {
  const token = Cookies.get('accessToken');
  if (!token) {
    console.error('No access token found');
    return Promise.reject(new Error('No access token found'));
  }

  return api.post('/user/userReviewDone', reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getUserChatRooms = () => api.get('/user/userChatRoom')

export const UserPartner = () => api.get('/user/userPartner')