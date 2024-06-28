import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import LoginContextProvider from './contexts/LoginContextProvider';
import Member from './pages/auth/Member';
import Index from './pages/index/Index';
import Test from './pages/Test';
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
        <Route path="/auth/login" element={<Login />} />
        <Route path="/user/userMypage" element={<ProtectedRoute component={UserMyPage} />} />
        <Route path="/user/userMypageUpdate" element={<ProtectedRoute component={UserMyPageUpdate} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;