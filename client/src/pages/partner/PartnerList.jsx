import React from 'react'
import PartnerList from '../containers/partner/PartnerContainer'
import { useParams } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout'

const PartnerList = () => {
  const {userNo} = useParams()
  return (
    <MainLayout>
    <PartnerContainer userNo = {userNo}/>
    </MainLayout>
  )
}

export default PartnerList