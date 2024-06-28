import Footer from '../../components/static/Footer';
import Header from '../../components/static/Header';
import IndexContainer from '../../containers/index/IndexContainer';
import React from 'react';
import '../../components/index/css/Home.css'

const Index = () => {
  return (
    <>
      <Header/>
        <IndexContainer/>
      <Footer/>
    </>
  );
};

export default Index;
