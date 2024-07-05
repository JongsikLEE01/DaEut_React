import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateReservation, updateReservationDetails } from '../../apis/admin/admin';
import UpdReserv from '../../components/admin/UpdReserv';
import './Admin.css';
import Sidebar from '../../components/static/Sidebar';
import Swal from 'sweetalert2';

const UpdReservContainer = ({ ordersNo }) => {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
      const fetchReservation = async () => {
        try {
          const response = await updateReservation(ordersNo);
          const data = response.data;
          setReservationData({
           ...data, // 기존 데이터 복사
          serviceDay: data.serviceDay || '', // serviceDay가 없으면 빈 문자열로 설정
          serviceTime: data.serviceTime || '', // serviceTime이 없으면 빈 문자열로 설정
          totalPrice: data.orders.totalPrice || '', // totalPrice가 없으면 빈 문자열로 설정
          serviceAddress: data.payments.serviceAddress || '' // serviceAddress가 없으면 빈 문자열로 설정
          });
        } catch (err) {
          console.error('Error fetching reservation data:', err);
        }
      };
      fetchReservation();
    }, [ordersNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReservationDetails(
        reservationData.orders.ordersNo,
        reservationData.user.userNo,
        reservationData.user.userName,
        reservationData.orders.title,
        reservationData.totalPrice, // 수정된 값
        reservationData.serviceAddress, // 수정된 값
        reservationData.serviceDay, // 수정된 값
        reservationData.serviceTime // 수정된 값
      );
      Swal.fire({
        icon: 'success',
        title: '수정 완료',
        text: '예약 정보가 성공적으로 수정되었습니다.',
      }).then(() => {
        navigate(`/admin/adminReservationRead/${ordersNo}`);
      });
    } catch (err) {
      console.error('예약 수정 중 오류가 발생했습니다.', err);
      Swal.fire({
        icon: 'error',
        title: '수정 실패',
        text: '예약 수정 중 오류가 발생했습니다.',
      });
    }
  };

  if (!reservationData) return null;

  return (
    <div className="container-fluid container">
      <div className="row">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
        <div className="col-md-9 col-lg-10 form-section">
          <div className="mb-5">
            <h3>예약 수정</h3>
            <div className="container mt-2 userRead">
              <UpdReserv
                reservationData={reservationData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdReservContainer;
