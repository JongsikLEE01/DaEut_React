import React from 'react'
import PartnerUpdateContainer from '../containers/PartnerUpdateContainer'
import { useParams } from 'react-router-dom'

const PartnerUpdate = () => {
    const { userNo } = useParams()
    return (
      <>
      {/* Header */}
      <PartnerUpdateContainer userNo={userNo}/>
      {/* Footer */}
      </>
    )
}

export default PartnerUpdate