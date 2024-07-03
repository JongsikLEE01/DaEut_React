import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import LoginContextProvider from './contexts/LoginContextProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Index from './pages/index/Index'
import Test from './pages/Test'
import Member from './pages/auth/Member'
import Service from './pages/Service/Service'
import ServiceRead from './pages/Service/ServiceRead'
import ServiceInsert from './pages/Service/ServiceInsert'
import ServiceUpdate from './pages/Service/ServiceUpdate'
import LoginPage from './pages/auth/LoginPage'
import LoginContextProvider from './components/contexts/LoginContextProvider'
import FindIdPage from './pages/auth/FindIdPage'
import DoneFindIdPage from './pages/auth/DoneFindIdPage'
import FindPasswordPage from './pages/auth/FindPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import ResetPwCompletePage from './pages/auth/ResetPwCompletePage'
import TipIndex from './pages/Tip/TipIndex'
import TipRead from './pages/Tip/TipRead'
import TipInsert from './pages/Tip/TipInsert'
import TipUpdate from './pages/Tip/TipUpdate'
import SingUpPage from './pages/auth/SingUpPage'
import AdminSignUpPage from './pages/auth/AdminSignUpPage'
import SignUpCompletePage from './pages/auth/SignUpCompletePage'
import Payment from './pages/Order/Payment'
import Done from './pages/Order/Done';
import False from './pages/Order/False';
import Chat from './pages/Service/Chat';

const App = () => {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          {/* Service */}
          <Route path="/" element={<Index />} />
          <Route path="/service" element={<Service />} />
          <Route path="/service/:serviceNo" element={<ServiceRead />} />
          <Route path="/service/insert" element={<ServiceInsert />} />
          <Route path="/service/update/:serviceNo" element={<ServiceUpdate />} />
          <Route path="/chat/:roomNo" element={<Chat />} />
          
          {/* Order */}
          <Route path="/order/:ordersNo" element={<Payment />} />
          <Route path="/order/done/:ordersNo/:date/:time/:userAddress/:userPost" element={<Done />} />
          <Route path="/order/false/:ordersNo/:date/:time/:userAddress/:userPost/:errorMsg" element={<False />} />
          
          {/*  */}
          <Route path="/test" element={<Test />} />
          <Route path="/auth/member" element={<Member />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/tip/boards' element={<TipIndex/>}></Route>
          <Route path='/tip/boards/:boardNo' element={<TipRead/>}></Route>
          <Route path='/tip/tipInsert' element={<TipInsert/>}></Route>
          <Route path='/tip/tipUpdate' element={<TipUpdate/>}></Route>
          <Route path="/findId" element={<FindIdPage />} />
          <Route path="/findIdComplete/:userId" element={<DoneFindIdPage />} />
          <Route path="/findPw" element={<FindPasswordPage />} />
          <Route path="/resetPw" element={<ResetPasswordPage />} />
          <Route path="/resetPwComplete" element={<ResetPwCompletePage />} />
          <Route path="/join" element={<SingUpPage />} />
          <Route path="/admin/join" element={<AdminSignUpPage />} />
          <Route path="/joinDone" element={<SignUpCompletePage />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  )
}


export default App

