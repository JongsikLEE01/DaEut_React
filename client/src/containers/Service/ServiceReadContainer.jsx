import React, { useEffect, useState } from 'react'
import * as Services from '../../apis/Services/Services'
import ServiceRead from '../../components/Service/ServiceRead'
import ReadHeader from '../../components/Service/ReadHeader'
import ReadSlide from '../../components/Service/ReadSlide'

const ServiceReadContainer = ({ serviceNo }) => {
  const [service, setService] = useState({})
  const [fileList, setFileList] = useState([])

  const getService = async () => {
    try {
      const response = await Services.select(serviceNo)
      const data = response.data

      const serviceData = data.service  // 서버 응답에서 서비스 데이터를 가져옴
      const files = data.fileList          // 서버 응답에서 파일 목록을 가져옴

      console.log(files);

      setService(serviceData)
      setFileList(files)
    } catch (e) {
      console.error('Error fetching service:', e)
    }
  }

  useEffect(() => {
    getService()
  }, [])

  return (
    <>
      <ReadHeader service={service} />
      <div class="detail-form">
        <ServiceRead 
          service={service}
          fileList={fileList}
        />
        <ReadSlide
          fileList={fileList}
        />
      </div>
    </>
  )
}

export default ServiceReadContainer
