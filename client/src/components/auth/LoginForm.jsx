import React, { useContext, useEffect, useState } from 'react'
import './auth.css'
import { LoginContext } from '../contexts/LoginContextProvider'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const { login, rememberId, setRememberId } = useContext(LoginContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const rememberedUsername = Cookies.get('username')
    if (rememberedUsername) {
      setUsername(rememberedUsername)
    }
  }, [])

  const onLogin = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

  const handleRememberId = (e) => {
    setRememberId(e.target.checked)
    if (!e.target.checked) {
      Cookies.remove('username')
      setUsername('')
    }
  }

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
                    name="rememberId"
                    id="remember-id"
                    checked={rememberId}
                    onChange={handleRememberId}
                  />
                  <label className="form-check-label" htmlFor="remember-id">아이디 저장</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-grid gap-3">
          <button type="submit" className="btn btn-dark">로그인</button>
          <Link to="/auth/join" className="btn btn-dark">회원 가입</Link>
          <button type="button" className="btn btn-light border" onClick={() => window.history.back()}>돌아가기</button>
        </div>
        <div className="text-center my-3">
          <hr />
          소셜계정으로 로그인
        </div>
        <div className="d-grid gap-2">
          <Link to="#" className="btn btn-light google border">
            <img src="/img/google.png" alt="Google" className="img-fluid" style={{ maxHeight: '20px' }} /> Google
          </Link>
          <Link to="/oauth2/authorization/kakao" className="btn btn-light kakao border">
            <img src="/img/kakao.png" alt="Kakao" className="img-fluid" style={{ maxHeight: '20px', width: '20px' }} /> Kakao
          </Link>
          <Link to="#" className="btn btn-light naver border">
            <img src="/img/naver.png" alt="Naver" className="img-fluid" style={{ maxHeight: '20px' }} /> Naver
          </Link>
        </div>
        <div className="text-center my-3">
          <hr />
          계정이 기억나지 않으신가요?
        </div>
        <div className="d-grid gap-2">
          <Link to="/findId" className="btn btn-light border">아이디 찾기</Link>
          <Link to="/findPw" className="btn btn-light border">비밀번호 찾기</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
