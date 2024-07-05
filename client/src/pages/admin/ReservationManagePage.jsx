import React from 'react';
import ReservationManageContainer from '../../containers/Admin/ReservationManageContainer';
import MainLayout from '../../layouts/MainLayout';
import ReservManage from '../../containers/Admin/ReservManage';

const ReservationManagePage = () => {
    return (
        <MainLayout>
            <ReservManage />
        </MainLayout>
    );
};

export default ReservationManagePage;
