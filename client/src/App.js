import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Member from './pages/auth/Member';
import Index from './pages/index/Index';
import Test from './pages/Test';
import Service from './pages/Service/Service';
import 'bootstrap/dist/css/bootstrap.min.css';
import ServiceRead from './pages/Service/ServiceRead';
import ServiceInsert from './pages/Service/ServiceInsert';
import ServiceUpdate from './pages/Service/ServiceUpdate';
import LoginContextProvider from './components/contexts/LoginContextProvider';
import LoginPage from './pages/auth/LoginPage';

function App() {
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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
