// src/pages/UserDetailPage.js
import React from 'react';
import UserDetailContainer from '../../containers/Admin/UserDetailContainer';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

const UserDetailPage = () => {
    const { userNo } = useParams()

    return (
        <MainLayout>
            <UserDetailContainer userNo={userNo} />;
        </MainLayout>
    )
    
};

export default UserDetailPage;
