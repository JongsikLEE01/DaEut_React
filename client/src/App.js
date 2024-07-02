import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index/Index';
import Test from './pages/Test';
import Member from './pages/auth/Member';
import Service from './pages/Service/Service';
import ServiceRead from './pages/Service/ServiceRead';
import ServiceInsert from './pages/Service/ServiceInsert';
import ServiceUpdate from './pages/Service/ServiceUpdate';
import LoginPage from './pages/auth/LoginPage';
import LoginContextProvider from './components/contexts/LoginContextProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import FindIdPage from './pages/auth/FindIdPage';
import DoneFindIdPage from './pages/auth/DoneFindIdPage';
// import LoginContextProvider from './contexts/LoginContextProvider'
import Order from './pages/Order/Payment'
import UserMypage from './pages/user/UserMypage';

const App = () => {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test" element={<Test />} />
          <Route path="/auth/member" element={<Member />} />
          <Route path="/service" element={<Service />} />
          <Route path="/service/:serviceNo" element={<ServiceRead />} />
          <Route path="/service/insert" element={<ServiceInsert />} />
          <Route path="/service/update/:serviceNo" element={<ServiceUpdate />} />
          <Route path="/order/:ordersNo" element={<Order />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/findId" element={<FindIdPage />} />
          <Route path="/findIdComplete/:userId" element={<DoneFindIdPage />} />
          <Route path="/user/UserMypage" element={<UserMypage />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
};

export default App;