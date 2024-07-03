import api from '../api';
import Cookies from 'js-cookie';

// export const getUserInfo = async () => {
//   const token = Cookies.get('accessToken');
//   if (!token) {
//     console.error('No access token found');
//     throw new Error('No access token found');
//   }

//   try {
//     const response = await api.get('/user/userMypage', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user info:', error);
//     throw error;
//   }
// };

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
