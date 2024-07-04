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
