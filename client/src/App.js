import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import LoginContextProvider from './contexts/LoginContextProvider';
import Member from './pages/auth/Member';
import Index from './pages/index/Index';
import Test from './pages/Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/test" element={<Test/>}></Route>
        <Route path="/member" element={<Member/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;