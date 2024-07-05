import React from 'react';
import UserUpdateContainer from '../../containers/Admin/UserUpdateContainer';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

const UserUpdatePage = () => {
    const { userNo } = useParams() 
    console.log("userNo : ", userNo);

    return (
        <MainLayout>
            <UserUpdateContainer userNo={(userNo)} /> 
        </MainLayout>
    );
};

export default UserUpdatePage;
