import React from 'react'
import PartnerList from '../containers/partner/PartnerContainer'
import { useParams } from 'react-router-dom'

const PartnerList = () => {
  const {userNo} = useParams()
  return (
    <>
    <PartnerContainer userNo = {userNo}/>
    </>
  )
}

export default PartnerList