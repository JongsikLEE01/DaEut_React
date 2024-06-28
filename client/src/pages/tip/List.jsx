import React from 'react';
import ListContainer from '../../containers/tip/ListContainer';
import Header from '../../components/static/Header';
import Footer from '../../components/static/Footer';

const List = () => {
    return (
      <>
        <Header></Header>
        <ListContainer />
        <Footer></Footer>
      </>
    );
  };
  
  export default List;