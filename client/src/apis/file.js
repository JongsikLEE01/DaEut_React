import axios from 'axios'

// 썸네일
export const tumbnail = (fileNo) => axios.get(`/files/${fileNo}`)
// 파일 업로드
export const upload = (formData, headers) => axios.post(`/files`, formData, headers)
// 파일 삭제
export const remove = (fileNo) => axios.delete(`/files/${fileNo}`)
// 파일 선택 삭제 요청
// export const removeFiles = (fileNos) => axios.delete(`/files?no=${fileNos}`)