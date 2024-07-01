import React from 'react'
import PartnerList from '../components/PartnerList'
import { useState } from 'react'
import * as partner from '../apis/partner'

const PartnerContainer = ( {userNo}) => {
  const [partner ,setPartner] = useState({})
  const [user, setUser] = useState({})

  // 함수
  const getPartner = async () => {
    const response = await partner.select(userNo)
    const data = await response.data
    setPartner(data)
  }

  useEffect( () => {
    getPartner()
  },[])

  return (
    <>
    </>
  )
}

export default PartnerContainer