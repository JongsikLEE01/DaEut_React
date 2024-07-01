import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // 토큰이 존재하면 인증된 상태로 간주

    return isAuthenticated ? <Component /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
