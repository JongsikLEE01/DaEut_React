import React from 'react';
import MemberContainer from '../../containers/auth/MemberContainer';
import Header from '../../components/static/Header';
import Footer from '../../components/static/Footer';

const Member = () => {
  return (
    <>
      <Header></Header>
      <MemberContainer />
      <Footer></Footer>
    </>
  );
};

export default Member;
