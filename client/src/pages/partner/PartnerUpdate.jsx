import React from 'react'
import PartnerUpdateContainer from '../../containers/partner/PartnerUpdateContainer'
import { useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const PartnerUpdate = () => {
    const { userNo } = useParams()
    return (
      <MainLayout>
      {/* Header */}
      <PartnerUpdateContainer userNo={userNo}/>
      {/* Footer */}
      </MainLayout>
    )
}

export default PartnerUpdate