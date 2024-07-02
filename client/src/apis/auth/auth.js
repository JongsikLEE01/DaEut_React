import axios from 'axios';
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




export const findId = (userName, userEmail, userPhone) => {
    return axios.post('/findId', { userName, userEmail, userPhone })
        .then(response => {
            return response.data; // 서버에서 전달한 데이터를 반환
        })
        .catch(error => {
            console.error('아이디 찾기 중 오류 발생:', error);
            throw error; // 오류 처리
        });
};


// 아이디 찾기 완료 요청
export const findIdComplete = (userId) => {
    return axios.get(`/findIdComplete?userId=${userId}`)
        .then(response => {
            return response.data; // 서버에서 전달한 데이터를 반환
        })
        .catch(error => {
            console.error('아이디 찾기 완료 중 오류 발생:', error);
            throw error; // 오류 처리
        });
};
