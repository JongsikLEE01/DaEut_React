// src/pages/UserDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import UserDetail from '../../containers/admin/UserDetail';

const UserReadContainer = () => {
    const { userNo } = useParams()

    return (
        <MainLayout>
            <UserDetail userNo={userNo} />;
        </MainLayout>
    )
    
};

export default UserReadContainer;
