import React, { useState } from 'react'
import { sendAuthCode, verifyAuthCode } from '../../apis/auth/auth'
import Swal from 'sweetalert2'

const FindPassword = () => {
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [authCode, setAuthCode] = useState('')
    const [inputAuthCode, setInputAuthCode] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await verifyAuthCode({ userName, userId, userEmail, inputAuthCode, authCode })
            if (response.message === '인증 성공') {
                Swal.fire({
                    icon: 'success',
                    title: '인증 성공',
                    text: response.message,
                    showConfirmButton: true // 확인 버튼 표시
                }).then(() => {
                    // 인증 성공 시, 비밀번호 재설정 페이지로 이동
                    window.location.href = `/resetPw?userId=${userId}`
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '인증 실패',
                    text: response.message,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: error.response?.data?.message || '오류가 발생했습니다.',
            })
        }
    }

    const handleSendAuthCode = async () => {
        try {
            const response = await sendAuthCode(userEmail)
            if (response && response.message) {
                setAuthCode(response.authCode) // 서버에서 받은 인증 코드를 상태로 저장
                Swal.fire({
                    icon: 'success',
                    title: '인증 코드 전송 성공',
                    text: response.message,
                    showConfirmButton: true
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '오류',
                    text: '인증 코드 전송 중 오류가 발생했습니다.',
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '오류',
                text: '인증 코드 전송 중 오류가 발생했습니다.',
            })
        }
    }

    return (
        <div className="container form-container">
            <form id="form" onSubmit={handleSubmit}>
                <h2 className="text-center">비밀번호 찾기</h2>
                <p className="text-center">비밀번호 찾기를 위한 정보를 입력해주세요.</p>
                <hr />
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="userName" 
                        className="form-control" 
                        placeholder="이름" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="userId" 
                        className="form-control" 
                        placeholder="아이디" 
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required 
                    />
                </div>
                <div className="mb-3 input-group">
                    <input 
                        type="text" 
                        name="userEmail" 
                        className="form-control" 
                        placeholder="이메일" 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required 
                    />
                    <button type="button" className="btn btn-primary custom-auth-btn" onClick={handleSendAuthCode}>인증하기</button>
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="authCode" 
                        className="form-control" 
                        placeholder="인증코드" 
                        value={inputAuthCode}
                        onChange={(e) => setInputAuthCode(e.target.value)}
                        required 
                    />
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark">비밀번호 찾기</button>
                    <button type="button" className="btn btn-light border" onClick={() => window.history.back()}>돌아가기</button>
                </div>
                <hr />
            </form>
        </div>
    )
}

export default FindPassword
