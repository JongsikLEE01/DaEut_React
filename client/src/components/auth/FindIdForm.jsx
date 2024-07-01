// FindIdForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate 사용
import { findId } from '../../apis/auth/auth'; // API 호출 함수 임포트

const FindIdForm = () => {
    const navigate = useNavigate(); // useHistory 대신 useNavigate 사용
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await findId(userName, userEmail, userPhone);
            const data = response.data;

            if (data.startsWith('redirect:/auth/findIdComplete')) {
                // 아이디 찾기 성공 시 리다이렉트 처리
                const userId = data.substring(26); // '/auth/findIdComplete?userId=' 길이만큼 제거
                navigate(`/auth/findIdComplete/${userId}`); // useNavigate 사용하여 리다이렉트
            } else {
                setErrorMessage(data); // 에러 메시지 설정
            }
        } catch (error) {
            console.error('아이디 찾기 중 오류 발생:', error);
            setErrorMessage('아이디 찾기 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container form-container">
            <form id="form" onSubmit={handleSubmit}>
                <h2 className="text-center">아이디 찾기</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <p className="text-center">아이디 찾기를 위한 정보를 입력해주세요.</p>
                <hr />

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="이름"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="이메일"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="전화번호"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark">
                        아이디 찾기
                    </button>
                    <button type="button" className="btn btn-light border" onClick={() => window.history.back()}>
                        돌아가기
                    </button>
                </div>
                <hr />
            </form>
        </div>
    );
};

export default FindIdForm;
