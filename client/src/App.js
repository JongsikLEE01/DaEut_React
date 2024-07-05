import React from 'react'
import { BrowserRouter, Route, Routes, Switch  } from 'react-router-dom'
// import LoginContextProvider from './contexts/LoginContextProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
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
import Order from './pages/Order/Payment'
import PartnerList from './pages/partner/PartnerList'
import PartnerReview from './pages/partner/PartnerReview'
import PartnerUpdate from './pages/partner/PartnerUpdate'
import PartnerReservation from './pages/partner/PartnerReservation'
import PartnerReservationRead from './pages/partner/PartnerReservationRead'
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
import OAuth2RedirectHandler from './components/auth/OAuth2RedirectHandler'
import Payment from './pages/Order/Payment'
import Done from './pages/Order/Done'
import False from './pages/Order/False'
import Chat from './pages/Service/Chat'
import UserMypage from './pages/user/UserMypage'
import UserMypageUpdate from './pages/user/UserMypageUpdate'
import UserReservation from './pages/user/UserReservation'
import UserReview from './pages/user/UserReview'
import UserChatRoom from './pages/user/UserChatRoom'
import UserManagementPage from './pages/admin/UserManagementPage'
import UserPartner from './pages/user/UserPartner'
import UserCart from './pages/user/UserCart'
import UserCancel from './pages/user/UserCancel'
import UserCancelDone from './pages/user/UserCancelDone'
import UserUpdatePage from './pages/admin/UserUpdatePage'
import ReservationManagePage from './pages/admin/ReservationManagePage'
import ReservationReadPage from './pages/admin/ReservationReadPage'
import PartnerChatList from './components/partner/PartnerChatList'
import UserDetailPage from './pages/admin/UserDetailPage'

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
          
          {/* 팁게시판  */}
          <Route path="/test" element={<Test />} />
          <Route path="/member" element={<Member />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/tip/boards' element={<TipIndex/>}></Route>
          <Route path='/tip/boards/:boardNo' element={<TipRead/>}></Route>
          <Route path='/tip/tipInsert' element={<TipInsert/>}></Route>
          <Route path='/tip/tipUpdate' element={<TipUpdate/>}></Route>
          
          {/*  파트너 */}
          <Route path="/partnerList/:userNo" element={<PartnerList/>}/>
          <Route path="/partner/reservation/:partnerNo" element={<PartnerReservation/>}/>
          <Route path="/partner/reviews/:partnerNo" element={<PartnerReview/>}/>
          <Route path="/partner/reservationRead/:ordersNo" element={<PartnerReservationRead/>}/>
          <Route path="/partner/partnerChatRoom" element={<PartnerChatList />} />
          {/* <Route path="PartnerUpdate" element={<PartnerUpdate/>}/> */}

          {/* 소셜로그인 */}
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
            
          {/* 로그인 */}  
          <Route path="/member" element={<Member />} />
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/findId" element={<FindIdPage />} />
          <Route path="/findIdComplete/:userId" element={<DoneFindIdPage />} /> 
          <Route path="/findPw" element={<FindPasswordPage />} />
          <Route path="/resetPw" element={<ResetPasswordPage />} />
          <Route path="/resetPwComplete" element={<ResetPwCompletePage />} />
          <Route path="/join" element={<SingUpPage />} />
          <Route path="/admin/join" element={<AdminSignUpPage />} />
          <Route path="/joinDone" element={<SignUpCompletePage />} />

          {/* 사용자 */}
          <Route path="/user/UserMypage" element={<UserMypage />} />
          <Route path="/user/UserMypageUpdate" element={<UserMypageUpdate />} />
          <Route path="/user/UserReservation" element={<UserReservation />} />
          <Route path="/user/UserReview" element={<UserReview/>} />
          <Route path="/user/UserChatRoom" element={<UserChatRoom/> }/>
          <Route path="/user/UserPartner" element={<UserPartner/> } />
          <Route path="/user/UserCart" element={<UserCart/> } />
          

          {/* 관리자 */}
          <Route path="/admin/adminUser" element={<UserManagementPage/>} />
            
          <Route path="/cancel/:ordersNo" element={<UserCancel />} />
          <Route path="/cancelDone/:ordersNo" element={<UserCancelDone />} />

          {/* 관리자 */}
          <Route path="/admin/adminUser" element={<UserManagementPage/>} />
          <Route path="/admin/adminUserRead/:userNo" element={<UserDetailPage/>} />
          <Route path="/admin/adminUserUpdate/:userNo" element={<UserUpdatePage />} />
          <Route path="/admin/adminReservation" element={<ReservationManagePage />} />
          <Route path="/admin/adminReservationRead/:ordersNo" element={<ReservationReadPage/>} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  )
}
export default App

