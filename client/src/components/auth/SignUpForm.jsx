import React from 'react'
import { checkDuplicateId, checkDuplicateEmail, join } from '../../apis/auth/auth'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import useForm from './hook/useForm'
import useValidation from './hook/useValidation'
import useDuplicateCheck from './hook/useDuplicateCheck'

const SignUpForm = () => {
    const navigate = useNavigate()

    const [formData, handleChange] = useForm({
        userId: '',
        userPassword: '',
        confirmPassword: '',
        userName: '',
        userBirth: '',
        userPhone: '',
        userEmail: '',
        userAddress: '',
        userGender: 'male' // 기본값 설정
    })

    const [isIdChecked, isEmailChecked, handleCheckDuplicateId, handleCheckDuplicateEmail] = useDuplicateCheck(checkDuplicateId, checkDuplicateEmail)
    const [validateForm, showAlert] = useValidation(formData, isIdChecked, isEmailChecked)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) {
            return
        }
        join(formData)
            .then(response => {
                const { data, status } = response
                if (status === 200 && data === 'SUCCESS') {
                    navigate('/joinDone') // 회원가입 완료 페이지로 이동
                } else {
                    showAlert('회원가입에 실패했습니다.', 'error')
                }
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
                showAlert(errorMessage, 'error')
                console.error('회원가입 오류:', error);
            })
    }
    

    return (
        <div className="container form-container">
            <form id="signup-form" onSubmit={handleSubmit}>
                <h2 className="text-center">계정 생성</h2>
                <p className="text-center">계정에 사용될 정보를 입력해주세요</p>

                <div className="mb-3 input-group">
                    <input
                        type="text"
                        className="form-control singId"
                        id="signId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        placeholder="아이디"
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-primary custom-auth-btn"
                        onClick={() => handleCheckDuplicateId(formData.userId)}
                    >
                        중복확인
                    </button>
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="userPassword"
                        name="userPassword"
                        value={formData.userPassword}
                        onChange={handleChange}
                        placeholder="비밀번호"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="비밀번호 확인"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        onChange={handleChange}
                        placeholder="이름"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        id="userBirth"
                        name="userBirth"
                        value={formData.userBirth}
                        onChange={handleChange}
                        placeholder="생년월일"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="userPhone"
                        name="userPhone"
                        value={formData.userPhone}
                        onChange={handleChange}
                        placeholder="연락처 ('-' 제외)"
                        required
                    />
                </div>

                <div className="mb-3 input-group">
                    <input
                        type="email"
                        className="form-control"
                        id="signEmail"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        placeholder="이메일"
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-primary custom-auth-btn"
                        onClick={() => handleCheckDuplicateEmail(formData.userEmail)}
                    >
                        중복확인
                    </button>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="userAddress"
                        name="userAddress"
                        value={formData.userAddress}
                        onChange={handleChange}
                        placeholder="주소"
                        required
                    />
                </div>

                <div className="mb-3">
                    <div className="gender-container d-flex justify-content-center column-gap-5">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="userGender"
                                id="male"
                                value="male"
                                checked={formData.userGender === 'male'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="male">남성</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="userGender"
                                id="female"
                                value="female"
                                checked={formData.userGender === 'female'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="female">여성</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="userGender"
                                id="other"
                                value="other"
                                checked={formData.userGender === 'other'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="other">기타</label>
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-3">
                    <button type="submit" className="btn btn-dark darkBtn">회원 가입</button>
                    <button type="button" className="btn btn-light border" onClick={() => window.history.back()}>돌아가기</button>
                </div>

                <div className="text-center my-3"><hr />소셜계정으로 회원 가입</div>

                <div className="d-grid gap-2">
                    {/* <Link to="#" className="btn btn-light google border">
                        <img src="/img/google.png" alt="Google" className="img-fluid" style={{ maxHeight: '20px' }} /> Google
                    </Link> */}

                    <Link to="#" className="btn btn-light kakao border">
                        <img src="/img/kakao.png" alt="Kakao" className="img-fluid" style={{ maxHeight: '20px', width: '20px' }} /> Kakao
                    </Link>

                    {/* <Link to="#" className="btn btn-light naver border">
                        <img src="/img/naver.png" alt="Naver" className="img-fluid" style={{ maxHeight: '20px' }} /> Naver
                    </Link> */}
                </div>

                <div>
                    <p className="description">
                        회원 가입 및 로그인 진행 시 본 사이트의<br /><b>서비스 약관</b> 및 <b>개인 정보 보호 정책</b>에 동의하는 것으로 간주합니다.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm
