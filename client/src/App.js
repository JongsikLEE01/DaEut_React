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
import UserMyPage from './pages/user/UserMyPage';
import UserMyPageUpdate from './pages/user/UserMyPageUpdate';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/protected/ProtectedRoute';

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
        <Route path="/auth/login" element={<Login />} />
        <Route path="/user/userMypage" element={<ProtectedRoute component={UserMyPage} />} />
        <Route path="/user/userMypageUpdate" element={<ProtectedRoute component={UserMyPageUpdate} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App