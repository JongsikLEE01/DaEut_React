import React from 'react'
import PartnerList from '../components/PartnerList'
import { useParams } from 'react-router-dom'

const PartnerList = () => {
  const {userNo} = useParams()
  return (
    <>
    <PartnerList userNo = {userNo}/>
    </>
  )
}

export default PartnerList