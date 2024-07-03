import React, { useContext, useState } from 'react'
import './css/auth.css'
import styles from './css/Auth.module.css'
import { LoginContext } from '../contexts/LoginContextProvider'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const LoginForm = () => {
  const { login, savedUsername } = useContext(LoginContext)
  const [username, setUsername] = useState(savedUsername);
  const [password, setPassword] = useState('')

  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
  const [rememberId, setRememberId] = useState(!!savedUsername);

  const onLogin = (e) => {
      e.preventDefault();
      login(username, password, rememberMe, rememberId);
  }

  const handleRememberId = (e) => {
    setRememberId(e.target.checked)
    if (!e.target.checked) {
      Cookies.remove('username')
      setUsername('')
    }
  }

  const handleSocialLogin = (provider) => {
      // http://localhost:3000/login/oauth2/code/kakao
      window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="container form-container">
      <form className='login-form' onSubmit={onLogin}>
        <h2 className="text-center">로그인</h2>
        <p className="text-center">다이웃 이용을 위한 아이디, 비밀번호를 입력해주세요.</p>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="아이디" name="username" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="비밀번호" name="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
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
                    checked={rememberId}
                    onChange={handleRememberId} 
                  />
                  <label className="form-check-label" htmlFor="remember-id">아이디 저장</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="remember-me" 
                    id="remember-me" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  <label className="form-check-label" htmlFor="remember-me">자동로그인</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-grid gap-3">
          <button type="submit" className="btn btn-dark btnbtn">로그인</button>
          <Link to="/join" className={`btn btn-light border btnbtn`}>회원 가입</Link>
          <button type="button" className={`btn btn-light border ${styles.border}`} onClick={() => window.history.back()}>돌아가기</button>
        </div>
        <div className="text-center my-3">
          <hr />
          소셜계정으로 로그인
        </div>
        <div className="d-grid gap-2">
          {/* <Link to="#" className="btn btn-light google border">
            <img src="/img/google.png" alt="Google" className="img-fluid" style={{ maxHeight: '20px' }} /> Google
          </Link> */}
          <Link to="#" className={`btn btn-light kakao border ${styles.border}`}>
                        <img src="/img/kakao.png" alt="Kakao" className="img-fluid" /> Kakao
                    </Link>
          {/* <Link to="#" className="btn btn-light naver border">
            <img src="/img/naver.png" alt="Naver" className="img-fluid" style={{ maxHeight: '20px' }} /> Naver
          </Link> */}
        </div>
        <div className="text-center my-3">
          <hr />
          계정이 기억나지 않으신가요?
        </div>
        <div className="d-grid gap-2">
          <Link to="/findId" className={`btn btn-light border ${styles.border}`}>아이디 찾기</Link>
          <Link to="/findPw" className={`btn btn-light border ${styles.border}`}>비밀번호 찾기</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
