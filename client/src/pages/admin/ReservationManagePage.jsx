import React from 'react';
import ReservationManageContainer from '../../containers/Admin/ReservationManageContainer';
import MainLayout from '../../layouts/MainLayout';

const ReservationManagePage = () => {
    return (
        <MainLayout>
            <ReservationManageContainer />
        </MainLayout>
    );
};

export default ReservationManagePage;
