import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useParams } from 'react-router-dom'
import ServiceUpdateContainer from '../../containers/Service/ServiceUpdateContainer'

const ServiceRead = () => {
  const { serviceNo } = useParams()
  console.log(`serviceNo? ${serviceNo}`)

  return (
    <MainLayout>
        <ServiceUpdateContainer serviceNo={serviceNo}/>
    </MainLayout>
  )
}

export default ServiceRead