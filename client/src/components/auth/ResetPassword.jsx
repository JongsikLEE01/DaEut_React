import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPw } from '../../apis/auth/auth';
import Swal from 'sweetalert2';
import './css/auth.css';
import styles from './css/Auth.module.css';

const ResetPassword = () => {
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 유효성 검사 로직
        if (!isPasswordValid(userPassword)) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호 유효성 오류',
                text: '비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
                confirmButtonText: '확인'
            });
            return;
        }

        try {
            const response = await resetPw(userId, userPassword, confirmPassword);

            if (response === 'SUCCESS') {
                Swal.fire({
                    icon: 'success',
                    title: '비밀번호가 성공적으로 변경되었습니다.',
                    showConfirmButton: true
                });
                navigate('/resetPwComplete');
            } else if (response === 'SAME') {
                Swal.fire({
                    icon: 'error',
                    title: '기존 비밀번호와 일치합니다.',
                    showConfirmButton: true
                });
            } else if (response === 'CHECKAGAIN') {
                Swal.fire({
                    icon: 'error',
                    title: '비밀번호가 일치하지 않습니다.',
                    showConfirmButton: true
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

    // 비밀번호 유효성 검사 함수
    const isPasswordValid = (password) => {
        // 최소 8자, 영문, 숫자, 특수문자 포함
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPattern.test(password);
    };

    return (
        <div className="container form-container">
            <form id="resetPwForm" onSubmit={handleSubmit}>
                <h2 className="text-center adminTitle">비밀번호 재설정</h2>
                <p className="text-center">비밀번호를 재설정 해주세요.</p>
                <hr />
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control inputAuth"
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
                        className="form-control inputAuth"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="d-grid gap-2">
                <button type="submit" className={`btn btn-light border btnbtn`}>확인</button>
                <button
                    type="button"
                    className={`btn btn-light border ${styles.border}`}
                    onClick={() => window.history.back()}>
                    돌아가기
                </button>
                </div>
                <hr />
            </form>
        </div>
    );
};

export default ResetPassword;
