import api from './api'

export const getUserInfo = (token) => {
  return api.get('/user/info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateUserInfo = (data, token) => {
  return api.put('/user/update', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
