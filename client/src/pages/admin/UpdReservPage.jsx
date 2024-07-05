import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import UpdReservContainer from '../../containers/Admin/UpdReservContainer'
import { useParams } from 'react-router-dom'

const UpdReservPage = () => {
    const { ordersNo } = useParams()

    return (
        <MainLayout>
            <UpdReservContainer ordersNo={ordersNo} />;
        </MainLayout>
    )
}

export default UpdReservPage