import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { findIdComplete } from '../../apis/auth/auth'
import './Auth.css'

const DoneFindId = () => {
    const { userId } = useParams()
    const [userName, setUserName] = useState('')

    useEffect(() => {
        findIdComplete(userId)
            .then(data => {
                setUserName(data.userId)
            })
            .catch(error => {
                console.error('아이디 찾기 완료 페이지 정보를 불러오는 중 오류 발생:', error)
            })
    }, [userId])

    return (
        <div className="container complete">
            <div className="form-container complete">
                <h2 className="text-center">아이디 찾기 완료!</h2>
                <p className="text-center mt-2" style={{ fontSize: '16px' }}>
                    회원님의 아이디는 다음과 같습니다.
                </p>
                <hr className="completeHr" />
                <p className="text-center mt-3"><strong>{userName}</strong></p>
                <Link to="/login" className="btn btn-primary custom-auth-btn complete success">확인</Link>
            </div>
        </div>
    )
}

export default DoneFindId
