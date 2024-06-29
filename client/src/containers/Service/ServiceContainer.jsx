import React, { useEffect, useState } from 'react'
import ServiceTitle from '../../components/Service/ServiceTitle'
import ServiceCard from '../../components/Service/ServiceCard'
import ServicePage from '../../components/Service/ServicePage'
import * as Services from '../../apis/Services/Services'
import '../../components/Service/css/Service.css'

const ServiceContainer = () => {
  const [serviceList, setServiceList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [servicePage, setServicePage] = useState({
    page: 1,
    first: 1,
    last: 1,
    prev: 1,
    next: 1,
    start: 1,
    end: 1,
  })

  // 데이터 가져오기
  const getServiceList = async (page, keyword) => {
    try {
      const response = await Services.list(page, keyword);
      console.log('API 응답:', response.data); // 응답 전체를 로그로 찍어서 구조를 검토합니다.
      const { data, ...pagination } = response.data;
      console.log('데이터:', data); // 데이터가 예상대로 포함되어 있는지 확인합니다.
      console.log('페이지네이션:', pagination); // 페이지네이션 세부 정보를 확인합니다.
      setServiceList(data);
      setServicePage(pagination);
      setKeyword(keyword);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };
  

  const handlePageChange = (page) => {
    getServiceList(page, keyword)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const keyword = formData.get('keyword') || ''
    getServiceList(1, keyword)
  }

  useEffect(() => {
    getServiceList()
  }, [])

  return (
    <>
      <ServiceTitle />
      <div className="reservation-card-grid">
      {serviceList && serviceList.length > 0 ? (
        serviceList.map((service) => (
          <ServiceCard key={service.serviceNo} service={service} />
        ))
      ) : serviceList && serviceList.length === 0 ? (
        <span>조회된 게시글 정보가 없습니다.</span>
      ) : (
        <span>데이터를 조회 중 에러 발생...</span>
      )}

      </div>
      <ServicePage
        servicePage={servicePage}
        keyword={keyword}
        onPageChange={handlePageChange}
        handleSearchSubmit={handleSearchSubmit}
      />
    </>
  )
}

export default ServiceContainer