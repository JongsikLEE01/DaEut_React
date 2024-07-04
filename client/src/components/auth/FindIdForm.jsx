import React, { useState } from 'react'
import './css/auth.css'
import { useNavigate } from 'react-router-dom'
import { findId } from '../../apis/auth/auth'
import styles from './css/Auth.module.css'

const FindIdForm = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const userDetails = {
                userName: userName,
                userEmail: userEmail,
                userPhone: userPhone
            }

            const response = await findId(userDetails)

            if (response.userId) {
                navigate(`/findIdComplete/${response.userId}`)
            } else {
                setErrorMessage(response.error || 'ID를 찾을 수 없습니다.')
            }
        } catch (error) {
            console.error('아이디 찾기 중 오류 발생 (FindIdForm) :', error)
            setErrorMessage(error.response?.data?.error || 'ID를 찾는 도중 오류가 발생했습니다.')
        }
    }

    return (
        <div className="container form-container">
            <form id="form" onSubmit={handleSubmit}>
                <h2 className="text-center adminTitle">아이디 찾기</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <p className="text-center">아이디 찾기를 위한 정보를 입력해주세요.</p>
                <hr />

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control inputAuth"
                        placeholder="이름"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control inputAuth"
                        placeholder="이메일"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control inputAuth"
                        placeholder="전화번호"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className={`btn btn-light border btnbtn`}>
                        아이디 찾기
                    </button>
                    <button type="button" className={`btn btn-light border ${styles.border}`} onClick={() => window.history.back()}>돌아가기</button>
                </div>
                <hr />
            </form>
        </div>
    )
}

export default FindIdForm
