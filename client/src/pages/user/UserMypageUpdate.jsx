import React from 'react';
import UserLayout from '../../layouts/UserLayout';
import UserMypageUpdateContainer from '../../containers/User/UserMypageUpdateContainer';

const UserMypageUpdate = () => {
  return (
    <>
      <UserLayout>
        <UserMypageUpdateContainer />
      </UserLayout>
    </>
  );
};

export default UserMypageUpdate;
