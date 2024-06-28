import React from 'react'
import Header from '../components/static/Header'
import Footer from '../components/static/Footer'

const MainLayout = ({children}) => {
  return (
    <>
        <Header/>
        <div className="container">
            {children}
        </div>
        <Footer/>
    </>
  )
}

export default MainLayout