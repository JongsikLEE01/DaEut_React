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
import UserMyPage from './pages/user/UserMyPage'
import UserMyPageUpdate from './pages/user/UserMyPageUpdate'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/protected/ProtectedRoute'
import UserReservation from './pages/user/UserReservation'
import UserReview from './pages/user/UserReview'
import UserChatRoom from './pages/user/UserChatRoom'
import UserPartner from './pages/user/UserPartner'
import UserCart from './pages/user/UserCart'

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
        <Route path="/user/UserMypage" element={<ProtectedRoute><UserMyPage /></ProtectedRoute>} />
        <Route path="/user/UserMypageUpdate" element={<ProtectedRoute><UserMyPageUpdate /></ProtectedRoute>} />
        <Route path="/user/UserPartner" element={<ProtectedRoute><UserPartner /></ProtectedRoute>} />
        <Route path="/user/UserChatRoom" element={<ProtectedRoute><UserChatRoom /></ProtectedRoute>} />
        <Route path="/user/UserReservation" element={<ProtectedRoute><UserReservation /></ProtectedRoute>} />
        <Route path="/user/UserReview" element={<ProtectedRoute><UserReview /></ProtectedRoute>} />      
        <Route path="/user/UserCart" element={<ProtectedRoute><UserCart /></ProtectedRoute>} />      
      </Routes>
    </BrowserRouter>
  )
}

export default App