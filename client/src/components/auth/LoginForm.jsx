import React, { useContext } from 'react';
import './auth.css';
import { LoginContext } from '../contexts/LoginContextProvider';

const LoginForm = () => {
    const { login } = useContext(LoginContext); // 📦 LoginContext 의 login 함수

    const onLogin = (e) => { // 기본 이벤트 방지
        e.preventDefault(); // <form> 요소
        const form = e.target; // 아이디 - <form> 아래 input name="username" 의 value
        const username = form.username.value; // 비밀번호 - <form> 아래 input name="password" 의 value
        const password = form.password.value;

        login(username, password);
    };

    return (
        <div className="container form-container">
            <form className='login-form' onSubmit={onLogin}>
                <h2 className="text-center">로그인</h2>
                <p className="text-center">다이웃 이용을 위한 아이디, 비밀번호를 입력해주세요.</p>
                <div className="alert alert-danger" role="alert" style={{ display: 'none' }}>
                    <p>에러 메시지</p>
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="아이디" 
                        name="username" 
                        id="username" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="비밀번호" 
                        name="password" 
                        id="password" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <div className="row">
                        <div className="col-10">
                            <div className="gender-container d-flex justify-content-center column-gap-5">
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="remember-id" 
                                        id="remember-id" 
                                    />
                                    <label className="form-check-label" htmlFor="remember-id">아이디 저장</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="remember-me" 
                                        id="remember-me" 
                                    />
                                    <label className="form-check-label" htmlFor="remember-me">자동 로그인</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-3">
                    <button type="submit" className="btn btn-dark">로그인</button>
                    <a href="/auth/join" className="btn btn-dark">회원 가입</a>
                    <button type="button" className="btn btn-light border" onClick={() => window.history.back()}>돌아가기</button>
                </div>
                <div className="text-center my-3">
                    <hr />
                    소셜계정으로 로그인
                </div>
                <div className="d-grid gap-2">
                    <a href="#" className="btn btn-light google border">
                        <img src="/img/google.png" alt="Google" className="img-fluid" style={{ maxHeight: '20px' }} /> Google
                    </a>
                    <a href="/oauth2/authorization/kakao" className="btn btn-light kakao border">
                        <img src="/img/kakao.png" alt="Kakao" className="img-fluid" style={{ maxHeight: '20px', width: '20px' }} /> Kakao
                    </a>
                    <a href="#" className="btn btn-light naver border">
                        <img src="/img/naver.png" alt="Naver" className="img-fluid" style={{ maxHeight: '20px' }} /> Naver
                    </a>
                </div>
                <div className="text-center my-3">
                    <hr />
                    계정이 기억나지 않으신가요?
                </div>
                <div className="d-grid gap-2">
                    <a href="/auth/findId" className="btn btn-light border">아이디 찾기</a>
                    <a href="/auth/findPw" className="btn btn-light border">비밀번호 찾기</a>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;
