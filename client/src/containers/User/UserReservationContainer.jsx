import React, { useEffect, useState } from 'react'
import '../../components/user/User.css'
import { getUserReservations } from '../../apis/Users/User'
import UserReservationForm from '../../components/user/UserReservationForm';

const UserReservationContainer = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getUserReservations();
        console.log('Fetched reservations:', response.data); // 로그 추가
        setReservations(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching reservations</p>;
  }

  return (
    <div className="form-section">
      <h3>내 예약 보기</h3>
      {reservations.length > 0 ? (
        reservations.map((order, index) => (
          <UserReservationForm key={order.ordersNo} order={order} index={index} />
        ))
      ) : (
        <p>No reservations available</p>
      )}
    </div>
  );
};

export default UserReservationContainer;
