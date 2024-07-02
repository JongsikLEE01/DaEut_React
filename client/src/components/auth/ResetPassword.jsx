import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPw } from '../../apis/auth/auth';
import Swal from 'sweetalert2'; // SweetAlert 불러오기

const ResetPassword = () => {
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPw(userId, userPassword, confirmPassword);
            
            // SweetAlert로 메시지 표시
            if (response === 'SUCCESS') {
                Swal.fire({
                    icon: 'success',
                    title: '비밀번호가 성공적으로 변경되었습니다.',
                     showConfirmButton: true // 확인 버튼 표시
                });
                navigate('/resetPwComplete');
            } else if (response === 'SAME') {
                Swal.fire({
                    icon: 'error',
                    title: '기존 비밀번호와 일치합니다.',
                     showConfirmButton: true // 확인 버튼 표시
                });
            } else if (response === 'CHECKAGAIN') {
                Swal.fire({
                    icon: 'error',
                    title: '비밀번호가 일치하지 않습니다.',
                     showConfirmButton: true // 확인 버튼 표시
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류가 발생했습니다.',
                text: error.message || '서버 오류',
                confirmButtonText: '확인'
            });
        }
    };

    return (
        <div className="container form-container">
            <form id="resetPwForm" onSubmit={handleSubmit}>
                <h2 className="text-center">비밀번호 재설정</h2>
                <p className="text-center">비밀번호를 재설정 해주세요.</p>
                <hr />
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="userPassword" 
                        name="userPassword" 
                        placeholder="비밀번호" 
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="비밀번호 확인" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark">확인</button>
                    <button type="button" className="btn btn-light border" onClick={() => window.history.back()}>돌아가기</button>
                </div>
                <hr />
            </form>
        </div>
    );
};

export default ResetPassword;
