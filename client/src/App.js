// import LoginContextProvider from './contexts/LoginContextProvider'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Member from './pages/auth/Member'
import Index from './pages/index/Index'
import Test from './pages/Test'
import Service from './pages/Service/Service'
import 'bootstrap/dist/css/bootstrap.min.css'
import ServiceRead from './pages/Service/ServiceRead'
import ServiceInsert from './pages/Service/ServiceInsert'
import ServiceUpdate from './pages/Service/ServiceUpdate'
import TipIndex from './components/tip/TipIndex';
import TipInsert from './components/tip/TipInsert';
import TipRead from './components/tip/TipRead';
import TipUpdate from './components/tip/TipUpdate';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/test" element={<Test/>}></Route>
        <Route path="/member" element={<Member/>}></Route>
        <Route path="/service" element={<Service/>}></Route>
        <Route path="/service/:serviceNo" element={<ServiceRead/>}></Route>
        <Route path="/service/insert" element={<ServiceInsert/>}></Route>
        <Route path="/service/update/:serviceNo" element={<ServiceUpdate/>}></Route>
        <Route path='/tip/boards' element={<TipIndex/>}></Route>
        <Route path='/tip/tipInsert' element={<TipInsert/>}></Route>
        <Route path='/tip/boards/:boardNo' element={<TipRead/>}></Route>
        <Route path='/tip/tipUpdate' element={<TipUpdate/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App