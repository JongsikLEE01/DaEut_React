import React from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

const SignUpComplete = () => {
    return (
        <div className="container complete">
            <div className="form-container complete">
                <h2 className="text-center">회원가입 완료</h2>
                <hr className="completeHr" />
                <p className="text-center">회원가입이 정상적으로 처리되었습니다.</p>
                <Link to="/login" className="btn btn-primary custom-auth-btn complete success">확인</Link>
            </div>
        </div>
    )
}

export default SignUpComplete
