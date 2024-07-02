import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'


const ResetPwComplete = () => {
    const navigate = useNavigate()

    return (
        <div className="container complete">
            <div className="form-container complete">
                <h2 className="text-center">비밀번호 재설정 완료</h2>
                <hr className="completeHr" />
                <p className="text-center">비밀번호가 재설정 되었습니다.</p>
                <button 
                    className="btn btn-primary custom-auth-btn complete success" 
                    onClick={() => navigate('/login')}
                >
                    확인
                </button>
            </div>
        </div>
    )
}

export default ResetPwComplete
