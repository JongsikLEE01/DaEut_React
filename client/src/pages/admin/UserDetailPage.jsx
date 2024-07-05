// src/pages/UserDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import UserReadContainer from '../../containers/Admin/UserReadContainer'
import UserDetail from '../../containers/Admin/UserDetail';

const UserDetailPage = () => {
    const { userNo } = useParams()

    return (
        <MainLayout>
            <UserReadContainer userNo={userNo} />;
        </MainLayout>
    )
    
};

export default UserDetailPage;
