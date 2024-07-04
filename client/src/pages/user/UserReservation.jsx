import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import UserReservationContainer from '../../containers/User/UserReservationContainer';

const UserReservation = () => {
  return (
    <UserLayout>
      <UserReservationContainer />
    </UserLayout>
  );
};

export default UserReservation;
