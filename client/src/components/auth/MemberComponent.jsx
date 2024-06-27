import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // react-router-dom의 Link 컴포넌트를 사용
import "../auth/auth.css";

const MemberComponent = ({ to, normalIcon, hoverIcon, text, className }) => {
  return (
    <div className="custom-margin">
      <div className="text-center">
        <Link to={to} className={`icon-box ${className}`}>
          <FontAwesomeIcon icon={normalIcon} className="normalIcon" />
          <FontAwesomeIcon icon={hoverIcon} className="hoverIcon" />
        </Link>
        <div className="icon-text">{text}</div>
      </div>
    </div>
  );
};

export default MemberComponent;
