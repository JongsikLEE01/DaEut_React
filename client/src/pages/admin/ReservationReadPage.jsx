import React from 'react'
import MainLayout from '../../layouts/MainLayout';
import ReservRead from '../../containers/Admin/ReservRead';
import { useParams } from 'react-router-dom';

const ReservationReadPage = () => {
    const { ordersNo } = useParams()

    return (
        <MainLayout>
            <ReservRead ordersNo={ordersNo}/>
        </MainLayout>
    );
};
export default ReservationReadPage