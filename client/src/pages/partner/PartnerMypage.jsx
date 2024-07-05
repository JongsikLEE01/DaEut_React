import React from 'react'
import PartnerContainer from '../../containers/partner/PartnerContainer'
import { useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const PartnerMypage = () => {
  const {userNo} = useParams()
  return (
    <MainLayout>
    <PartnerContainer userNo = {userNo}/>
    </MainLayout>
  )
}

export default PartnerMypage