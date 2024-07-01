import axios from 'axios';

// 목록 조회
export const list = (params) => {
  return axios.get('/tip/boards', { params });
};

// 상세 조회
export const select = (boardNo) => {
  return axios.get(`/boards/${boardNo}`);
};

// 등록
export const insert = (formData, headers) => {
  return axios.post("/boards", formData, { headers });
};

// 수정
export const update = (boardNo, formData, headers) => {
  return axios.put(`/boards/${boardNo}`, formData, { headers });
};

// 삭제
export const remove = (boardNo) => {
  return axios.delete(`/boards/${boardNo}`);
};
