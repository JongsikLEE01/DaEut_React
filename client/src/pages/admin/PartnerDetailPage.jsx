import React from 'react'
import MainLayout from '../../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import PartnerReadContainer from '../../containers/Admin/PartnerReadContainer';

const PartnerDetailPage= () => {
    const { userNo } = useParams()

    return (
        <MainLayout>
            <PartnerReadContainer userNo={userNo} />;
        </MainLayout>
    )
    
};


export default PartnerDetailPage