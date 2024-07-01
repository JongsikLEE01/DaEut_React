import React from 'react';
import MemberContainer from '../../containers/auth/MemberContainer';
import MainLayout from '../../layouts/MainLayout';

const Member = () => {
  return (
    <>
      <MainLayout>
        <MemberContainer />
      </MainLayout>
    </>
  );
};

export default Member;
