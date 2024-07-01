import React from 'react';
import { Navigate } from 'react-router-dom';

// 로그인 여부를 확인하는 함수 (예시)
const isAuthenticated = () => {
  // 실제 인증 로직을 구현하세요
  return localStorage.getItem('token') !== null;
};

const ProtectedRoute = ({ children, component: Component }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (Component) {
    return <Component />;
  }

  return children;
};

export default ProtectedRoute;
