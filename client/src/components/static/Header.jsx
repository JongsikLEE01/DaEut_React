import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import './css/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <Link to="/">
          <div className="navbar-brand">
            <img src={`${process.env.PUBLIC_URL}/img/logo_w.png`} alt="DA E UT 로고" />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          id="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} id="menu-icon" />
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/reservation/reservation">예약</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tip/index">팁</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/member">로그인</Link> {/* Updated this line */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
