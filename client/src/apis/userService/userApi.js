import axios from 'axios';

// 로그인
export const login = (user) => axios.post('/auth/login', user);

// 아이디 찾기
export const findUserByDetails = (userName, userEmail, userPhone) => 
    axios.get('/findUser', { params: { userName, userEmail, userPhone } });

// 비밀번호 찾기 (재설정)
export const updatePw = (user) => axios.put('/updatePw', user);

// 아이디로 사용자 조회
export const select = (username) => axios.get('/select', { params: { username } });

// 이메일로 사용자 조회
export const findUserByEmail = (userEmail) => axios.get('/findUserByEmail', { params: { userEmail } });

// 회원 가입
export const join = (user) => axios.post('/auth/join', user);

// 회원 권한 등록
export const insertAuth = (userAuth) => axios.post('/insertAuth', userAuth);

// 파트너 신청
export const insertPartner = (partner) => axios.post('/insertPartner', partner);

// 파트너 신청 대기
export const updateUserStatus = (userNo) => axios.put('/updateUserStatus', { userNo });

// user 및 partner 테이블에서 정보 조회
export const selectUserAndPartnerDetails = (userNo) => axios.get('/selectUserAndPartnerDetails', { params: { userNo } });

// 회원 수정
export const update = (user) => axios.put('/update', user);

// 회원 탈퇴
export const deleteUser = (user) => axios.delete('/delete', { data: user });

// 예약
export const selectOrdersByUserId = (userId) => axios.get('/selectOrdersByUserId', { params: { userId } });

// 파트너 찾기
export const selectPartner = (userNo) => axios.get('/selectPartner', { params: { userNo } });

// 번호로 유저 찾기
export const selectByUserNo = (userNo) => axios.get('/selectByUserNo', { params: { userNo } });

// 유저 이름으로 찾기
export const findByUsername = (username) => axios.get('/findByUsername', { params: { username } });

// 유저 번호로 찾기
export const findUserById = (userNo) => axios.get('/findUserById', { params: { userNo } });

// 소셜 회원 가입
export const insertSocial = (userSocial) => axios.post('/insertSocial', userSocial);

// 소셜 회원 조회
export const selectSocial = (userSocial) => axios.get('/selectSocial', { params: userSocial });

// 소셜 회원 수정
export const updateSocial = (userSocial) => axios.put('/updateSocial', userSocial);

// 소셜 정보로 회원 조회
export const selectBySocial = (userSocial) => axios.get('/selectBySocial', { params: userSocial });
