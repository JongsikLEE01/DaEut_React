import React from 'react'
import { Link } from 'react-router-dom'
import './css/auth.css'
import styles from './css/Auth.module.css'

const ResetPwComplete = () => {

    return (
        <div className="container complete">
            <div className="form-container complete">
                <h2 className="text-center">비밀번호 재설정 완료</h2>
                <hr className="completeHr" />
                <p className="text-center">비밀번호가 재설정 되었습니다.</p>
                <Link to="/login" className={`btn btn-primary ${styles.success}`}>확인</Link>
            </div>
        </div>
    )
}

export default ResetPwComplete
