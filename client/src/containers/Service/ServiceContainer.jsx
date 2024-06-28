import React, { useEffect, useState } from 'react';
import ServiceTitle from '../../components/Service/ServiceTitle';
import ServiceCard from '../../components/Service/ServiceCard';
import ServicePage from '../../components/Service/ServicePage';
import * as Services from '../../apis/Services/Services';
import '../../components/Service/css/Service.css';

const ServiceContainer = () => {
  const [serviceList, setServiceList] = useState([]);

  // 서비스 목록 가져오기
  const getServiceList = async () => {
    try {
      const response = await Services.list();
      const data = response.data;
      setServiceList(data);
    } catch (error) {
      console.error('Error fetching service list:', error);
    }
  }

  useEffect(() => {
    getServiceList();
  }, []);

  return (
    <>
      <section style={{ width: '1250px' }}>
        <ServiceTitle />
        
        <div className="reservation-card-grid">
          {serviceList.length === 0 ? (
            <span>조회된 게시글 정보가 없습니다.</span>
          ) : (
            serviceList.map((service) => (
              <ServiceCard key={service.serviceNo} service={service} />
            ))
          )}
        </div>
      </section>

      <ServicePage />
    </>
  );
}

export default ServiceContainer;
