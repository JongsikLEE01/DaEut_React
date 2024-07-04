import axios from 'axios';
import api from '../api'

// 회원 목록
export const getAllUsers = async (page = 1) => {
    try {
        const response = await api.get('/admin/adminUser', { params: { page } })
        console.log(response); // 응답을 로그에 출력하여 확인
        return response
    } catch (error) {
        console.error('Error fetching users:', error)
        throw error // 오류를 다시 던져서 상위에서 처리할 수 있도록 합니다.
    }
}

// 회원 선택 삭제
export const deleteSelectedUsers = async (deleteNoList) => {
    try {
        const response = await api.post('/admin/user/delete', deleteNoList)
        console.log(response); // 응답을 로그에 출력하여 확인
        return response
    } catch (error) {
        console.error('Error deleting users:', error);
        throw error // 오류를 다시 던져서 상위에서 처리할 수 있도록 합니다.
    }
}

// 특정 사용자 및 리뷰 정보 가져오기
export const getUserAndReviews = async (userId) => {
    try {
        const response = await api.get(`/admin/adminUserRead/${userId}`);
        console.log(response); // 응답을 로그에 출력하여 확인
        return response.data; // 필요에 따라 응답 데이터 반환 방식 수정
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // 오류를 다시 던져서 상위에서 처리할 수 있도록 합니다.
    }
}

// 사용자 리뷰 삭제
export const deleteReview =(reviewNo) => axios.delete(`/admin/adminReviewDelete/${reviewNo}`)
