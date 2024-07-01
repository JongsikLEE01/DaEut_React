import api from '../api';

// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`);
// 사용자 정보
export const info = () => api.get(`/info`); // 수정된 부분
// 회원 가입
export const join = (data) => api.post(`/auth`, data);
// 회원 정보 수정
export const update = (data) => api.put(`/auth`, data);
// 회원 탈퇴
export const remove = (userId) => api.delete(`/auth/${userId}`);
