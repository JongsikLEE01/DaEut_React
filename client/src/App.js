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
      </Routes>
    </BrowserRouter>
  )
}

export default App