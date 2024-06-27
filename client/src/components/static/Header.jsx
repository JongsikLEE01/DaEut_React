import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/header.css'
// import './js/script'

const Header = () => {
  return (
    <header>
        <nav className="navbar navbar-expand-lg">
            <Link to="/">
              <div className="navbar-brand">
                <img src={`${process.env.PUBLIC_URL}/img/logo_w.png`} alt="DA E UT 로고" />
              </div>
            </Link>
            <button className="navbar-toggler" id="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa-solid fa-bars" id="menu-icon"></i>
            </button>

            {/* TODO : 로그인 상태에 따른 헤더 변화 필요 & Link로 변경 필요 */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/reservation/reservation">예약</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/tip/index">팁</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/auth/member">로그인</a>
                </li>
              </ul>
            </div>
        </nav>
    </header>
  )
}

export default Header