import React from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto">
      <div className="row">
        <div className="col-md-11 d-flex justify-content-center">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="#">회사 소개</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">이용약관 및 규칙</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">개인정보 처리 방침 및 청소년보호정책</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">광고문의</Link>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="row mt-3">
        <div className="col-md-3 d-flex justify-content-center align-items-center logo text-center text-md-left">
          <div>
            <img src={`${process.env.PUBLIC_URL}/img/logo_h.png`} alt="DA E UT 로고" className="img-fluid mb-2" />
          </div>
        </div>
        <div className="col-md-3 company-info text-center text-md-left">
          <p className="letter-spacing"><strong>㈜다이웃</strong> 대표이사: 이종식</p>
          <p className="letter-spacing">주소: 서울시 강남구 논현로 508(역삼동, GS타워)</p>
          <p className="letter-spacing">사업자등록번호: 117-88-00000</p>
          <p className="letter-spacing">통신판매업신고: 제2024-서울강남-00000호</p>
          <p className="letter-spacing">개인정보보호책임자: 홍길동</p>
          <p className="letter-spacing">호스팅제공자: ㈜카페24</p>
          <p className="letter-spacing">고객센터: (무료)080-123-4567 / (유료)02-1234-5678</p>
          <p className="letter-spacing">이메일 문의: <Link to="mailto:daeut@gmail.com">daeut@gmail.com</Link></p>
        </div>
        <div className="col-md-3 text-center text-md-left">
          <p className="letter-spacing">조은은행 채무지급보증안내:</p>
          <p className="custom-break">
            전자상거래 등에서의 소비자보호에 관한 법률에 따라<br />
            조은은행과 채무지급보증 계약을 체결하여 고객님의 결제 금액에 대한<br />
            안전거래를 보장하고 있습니다.
          </p>
          <p className="letter-spacing">서비스 가입 사실 확인</p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 text-center">
          <p className="text-muted">Copyright © Da E ut Co.Lid All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
