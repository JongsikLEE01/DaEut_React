import React from 'react'
import MemberComponent from '../../components/auth/MemberComponent'
import { faLock, faLockOpen, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import '../../components/auth/css/auth.css'

const MemberContainer = () => {
  return (
    <div className="containerMember">
      <div className="memberRow">
        <MemberComponent
          to="/login"
          normalIcon={faLock}
          hoverIcon={faLockOpen}
          text="로그인 하기"
          className="login-icon"
        />
        <MemberComponent
          to="/join"
          normalIcon={faUser}
          hoverIcon={faUsers}
          text="회원가입 하기"
          className="signup-icon"
        />
        <MemberComponent
          to="/admin/join"
          normalIcon={faUser}
          hoverIcon={faUsers}
          text="관리자 회원가입"
          className="signup-icon"
        />
      </div>
    </div>
  )
}

export default MemberContainer
