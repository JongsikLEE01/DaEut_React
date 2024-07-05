import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as Services from '../../apis/Services/Services'

const CalendarComponent = ({ serviceNo }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {

        console.log('캘린더 서비스 넘버:', serviceNo); // 추가
        const response = await Services.Calendar(serviceNo)

        console.log('리스폰스 데이터(캘린더):', response.data); // 데이터 확인 
        
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [serviceNo]);

  return (
    <div className="reservation-status section" id="reservation-status">
      <h4 className="reservation-intro2">예약 현황</h4>
      <hr className="section-underbar" />
      <div className="calender-info">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="700px"
          
          expandRows={true}
          headerToolbar={{
            right: 'prev,next today',
          }}
          selectable={true}
          nowIndicator={true}
          dayMaxEvents={true}
          locale="ko"
        />
        <div className="calender-color-info">
          <p><span className="color-box color-unavailable"></span>예약 불가</p>
          <p><span className="color-box color-today"></span>오늘</p>
          <p><span className="color-box color-selected"></span>예약일</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
