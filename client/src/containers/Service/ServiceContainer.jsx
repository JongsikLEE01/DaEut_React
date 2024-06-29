import React, { useEffect, useState } from 'react'
import ServiceTitle from '../../components/Service/ServiceTitle'
import ServiceCard from '../../components/Service/ServiceCard'
import ServicePage from '../../components/Service/ServicePage'
import * as Services from '../../apis/Services/Services'
import '../../components/Service/css/Service.css'

const ServiceContainer = () => {
  const [serviceList, setServiceList] = useState([])  // 서비스 목록 상태
  const [page, setPage] = useState(1)                 // 현재 페이지 상태
  const [totalCount, setTotalCount] = useState('')    // 마지막 페이지
  const [keyword, setKeyword] = useState('')          // 검색어

  console.log(keyword)
  
  // 서비스 목록 가져오기
  const getServiceList = async () => {
    try {
      const response = await Services.list(page, keyword) 
      const data = response.data
      setServiceList(data.serviceList)
      setTotalCount(data.page)

      console.log(totalCount)
      console.log('serviceList? '+serviceList)
    } catch (e) {
      console.error('목록을 가져오는 중 오류 발생...', e)
    }
  }
  

  useEffect(() => {
    getServiceList()
  }, [page, keyword])

  return (
    <>
      <section>
        <ServiceTitle />
        
        {/* 서비스 카드 목록 */}
        <div className="reservation-card-grid">
          {serviceList.length === 0 ? (
            <img src={`${process.env.PUBLIC_URL}/img/no-search.png`} alt="조회된 결과 없음" className='img-fluid' />
          ) : (
            serviceList.map((service) => (
              <ServiceCard key={service.serviceNo} service={service} />
            ))
          )}
        </div>
      </section>

      {/* 페이지네이션, 검색 컴포넌트 */}
      <ServicePage
        page={page}             // 현재 페이지
        setPage={setPage}       // 페이지 변경 함수
        totalCount={totalCount} // 총 개수
        keyword={keyword}       // 검색어
        setKeyword={setKeyword} // 검색어 변경 함수
      />
    </>
  )
}

export default ServiceContainer
