import React from 'react'
import * as Services from '../../apis/Services/Services'
import { useNavigate } from 'react-router-dom'
import ServiceInsert from '../../components/Service/ServiceInsert'

const ServiceInsertContainer = () => {
  const navigate = useNavigate()

  // 서비스 등록 함수
  const onInsert = async (formData, headers) => {
    try {
      console.log(formData);
      const response = await Services.insert(formData, headers)
      const status = await response.status
      console.log(`게시글 등록 요청 결과? ${status}`)

      // 등록 완료 후 목록으로 이동
      navigate('/service')
    } catch (e) {
      console.error('게시글 등록 실패', e)
    }
  }

  return (
    <>
      <ServiceInsert onInsert={ onInsert }/>
    </>
  )
}

export default ServiceInsertContainer