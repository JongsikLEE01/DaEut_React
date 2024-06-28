import axios from 'axios';

// 목록 조회
export const listBoards = () => {
  return axios.get("/boards");
};

// 상세 조회
export const getBoard = (boardNo) => {
  return axios.get(`/boards/${boardNo}`);
};

// 등록
export const insertBoard = (formData, headers) => {
  return axios.post("/boards", formData, { headers });
};

// 수정
export const updateBoard = (boardNo, formData, headers) => {
  return axios.put(`/boards/${boardNo}`, formData, { headers });
};

// 삭제
export const deleteBoard = (boardNo) => {
  return axios.delete(`/boards/${boardNo}`);
};
