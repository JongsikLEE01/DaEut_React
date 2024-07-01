import React from 'react'
import ServiceReadContainer from '../../containers/Service/ServiceReadContainer'
import MainLayout from '../../layouts/MainLayout'
import { useParams } from 'react-router-dom'

const ServiceRead = () => {
  const { serviceNo } = useParams()
  console.log(`serviceNo? ${serviceNo}`)

  return (
    <MainLayout>
        <ServiceReadContainer
          serviceNo={serviceNo}
        />
    </MainLayout>
  )
}

export default ServiceRead