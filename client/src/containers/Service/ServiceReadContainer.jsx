import React, { useEffect, useState } from 'react'
import * as Services from '../../apis/Services/Services'
import ServiceRead from '../../components/Service/ServiceRead'
import ReadHeader from '../../components/Service/ReadHeader'
import ReadSlide from '../../components/Service/ReadSlide'
import ReadPartnerInfo from '../../components/Service/ReadPartnerInfo'
import ReadInfo from '../../components/Service/ReadInfo'
import ReadReview from '../../components/Service/ReadReview'
import ReadContent from '../../components/Service/ReadContent'

const ServiceReadContainer = ({ serviceNo }) => {
  const [service, setService] = useState({})
  const [fileList, setFileList] = useState([])
  const [partner, setPartner] = useState({})
  const [partnerInfo, setPartnerInfo] = useState({})
  const [pthumbnail, setPthumbnail] = useState({})

  const getService = async () => {
    try {
      const response = await Services.select(serviceNo)
      const data = response.data

      const serviceData = data.service  // 서버 응답에서 서비스 데이터를 가져옴
      const files = data.fileList          // 서버 응답에서 파일 목록을 가져옴
      const partner = data.pUsers          // 서버 응답에서 파트너를 가져옴
      const partnerInfo = data.partner     // 서버 응답에서 파트너 정보를 가져옴
      const pthumbnail = data.pthumbnail     // 서버 응답에서 파트너 정보를 가져옴

      setService(serviceData)
      setFileList(files)
      setPartner(partner)
      setPartnerInfo(partnerInfo)
      setPthumbnail(pthumbnail)
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
        <ReadContent
          service={service}
        />
        <ServiceRead 
          service={service}
          fileList={fileList}
        />
        <div class="detail-content">
          <div className="reservation-service-content">
            <ReadSlide
              fileList={fileList}
            />
            <ReadPartnerInfo
              partner={partner}
              partnerInfo={partnerInfo}
              pthumbnail={pthumbnail}
            />
            <ReadInfo/>
          </div>
          <ReadReview />
        </div>
      </div>
    </>
  )
}

export default ServiceReadContainer
