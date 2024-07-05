import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import UpdateUserContainer from '../../containers/Admin/UpdateUserContainer';

const UserUpdatePage = () => {
    const { userNo } = useParams() 
    console.log("userNo : ", userNo);

    return (
        <MainLayout>
            <UpdateUserContainer userNo={(userNo)} /> 
        </MainLayout>
    );
};

export default UserUpdatePage;
