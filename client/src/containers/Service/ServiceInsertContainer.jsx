import React from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceInsert from '../../components/Service/ServiceInsert'
import * as Services from '../../apis/Services/Services'

const ServiceInsertContainer = () => {
  const navigate = useNavigate()

  // 서비스 등록 함수
  const onInsert = async (formData, headers) => {
    try {
      const response = await Services.insert(formData, headers)
      const status = response.status
      console.log(`게시글 등록 요청 결과? ${status}`)

      // 등록 완료 후 목록으로 이동
      navigate('/service')
    } catch (error) {
      console.error('게시글 등록 실패', error)
    }
  }

  console.log("ServiceInsertContainer - onInsert function: ", onInsert)

  return (
    <>
      <ServiceInsert onInsert={onInsert} />
    </>
  )
}

export default ServiceInsertContainer