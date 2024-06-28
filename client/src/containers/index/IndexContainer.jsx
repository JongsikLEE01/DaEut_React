import React from 'react'
import Home from '../../components/index/Home'
import Section from '../../components/index/Section'
import Slide from '../../components/index/Slide'
import Tap from '../../components/index/Tap'

const IndexContainer = () => {
  return (
    <body className='index-body'>
        <Home/>
        <Slide/>
        <Tap/>
        <Section/>
    </body>
  );
};

export default IndexContainer;
