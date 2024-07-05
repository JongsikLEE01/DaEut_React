import React from 'react'
import MainLayout from '../../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import UpdatePartner from '../../containers/Admin/UpdatePartner';

const PartnerUpdatePage = () => {
    const { userNo } = useParams() 
    console.log("userNo : ", userNo);

    return (
        <MainLayout>
            <UpdatePartner userNo={(userNo)} /> 
        </MainLayout>
    );
}

export default PartnerUpdatePage