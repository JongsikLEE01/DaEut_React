import React, { useEffect, useState } from 'react'
import * as Services from '../../apis/Services/Services'
import * as files from '../../apis/file'
import { useNavigate } from 'react-router-dom'
import ServiceUpdateForm from '../../components/Service/ServiceUpdateForm'

const ServiceUpdateContainer = ({ serviceNo }) => {
  const navigate = useNavigate()
  const [service, setService] = useState({})
  const [fileList, setFileList] = useState([])

  // 서비스 검색 함수
  const getService = async () => {
    try {
      const response = await Services.select(serviceNo)
      const data = response.data

      const serviceData = data.service  // 서버 응답에서 서비스 데이터를 가져옴
      const files = data.fileList          // 서버 응답에서 파일 목록을 가져옴

      setService(serviceData)
      setFileList(files)
    } catch (e) {
      console.error('서비스 검색 실패', e)
    }
  }

  // 서비스 수정 함수
  const onUpdate = async (formData, headers) => {
    try {
      console.log(formData);
      const response = await Services.update(formData, headers)
      const status = await response.status
      console.log(`요청 결과? ${status}`)

      // 수정 완료 후 목록으로 이동
      navigate('/service')
    } catch (e) {
      console.error('게시글 수정 실패', e)
    }
  }

  // 서비스 삭제
  const onRemove = async (serviceNo) => {
    try {
      
      const response = await Services.remove(serviceNo)
      const status = await response.status
      console.log(`서비스 삭제 요청 결과 ${status}`)

      // 삭제 완료 후 목록으로 이동
      navigate('/service')
    } catch (e) {
      console.error('게시글 삭제 실패', e)
    }
  }

  useEffect(() => {
    getService()
  }, [])

  return (
    <>
        <ServiceUpdateForm 
          onUpdate={onUpdate}
          service={service}
          fileList={fileList}
          onRemove={onRemove}
        />
    </>
  )
}

export default ServiceUpdateContainer