import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findIdComplete  } from '../../apis/auth/auth'; // API 호출 함수 임포트

const DoneFindId = () => {
    const { userId } = useParams(); // URL 파라미터에서 userId 가져오기
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // 컴포넌트가 마운트되면서 userId를 사용하여 아이디 찾기 완료 페이지 정보를 가져옴
        findIdComplete(userId)
            .then(data => {
                setUserName(data); // 가져온 데이터를 상태에 저장
            })
            .catch(error => {
                console.error('아이디 찾기 완료 페이지 정보를 불러오는 중 오류 발생:', error);
                // 오류 처리 로직 추가
            });
    }, [userId]); // userId가 변경될 때마다 실행

    return (
        <div className="container complete">
            <div className="form-container complete">
                <h2 className="text-center">아이디 찾기 완료!</h2>
                <p className="text-center mt-2" style={{ fontSize: '16px' }}>
                    회원님의 아이디는 다음과 같습니다.
                </p>
                <hr className="completeHr" />
                <p className="text-center mt-3"><strong>{userName}</strong></p>
                <a href="/auth/login" className="btn btn-primary custom-auth-btn complete sessuce">확인</a>
            </div>
        </div>
    );
};
export default DoneFindId;