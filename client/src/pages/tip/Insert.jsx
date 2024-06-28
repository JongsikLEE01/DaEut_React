import React from 'react';
import Header from '../../components/static/Header';
import Footer from '../../components/static/Footer';
import InsertContainer from '../../containers/tip/InsertContainer';

const List = () => {
    return (
      <>
        <Header></Header>
        <InsertContainer />
        <Footer></Footer>
      </>
    );
  };
  
  export default List;