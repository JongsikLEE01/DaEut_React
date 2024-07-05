import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import UpdateUser from '../../containers/Admin/UpdateUser';

const UserUpdatePage = () => {
    const { userNo } = useParams() 
    console.log("userNo : ", userNo);

    return (
        <MainLayout>
            <UpdateUser userNo={(userNo)} /> 
        </MainLayout>
    );
};

export default UserUpdatePage;
