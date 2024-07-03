import axios from 'axios';

// 목록 조회
export const list = (params) => {
  return axios.get('/tip/boards', { params });
};

// 상세 조회
export const select = (boardNo) => {
  return axios.get(`/tip/boards/${boardNo}`);
};

// 등록
export const insert = (formData, headers) => {
  return axios.post("/tip/boards", formData, { headers });
};

// 수정
export const update = (boardNo, formData, headers) => {
  return axios.put(`/tip/boards/${boardNo}`, formData, { headers });
};

// 삭제
export const remove = (boardNo) => {
  return axios.delete(`/tip/boards/${boardNo}`);
};

// 추천
export const incrementBoardLike = (boardNo, userNo) => {
  return axios.put(`/tip/boards/${boardNo}/like`, null, {
    params: { userNo }
  });
};