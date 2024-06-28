import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import LoginContextProvider from './contexts/LoginContextProvider';
import Home from './components/Home';
import Member from './pages/auth/Member'
import TipIndex from './components/tip/TipIndex'
import TipInsert from './components/tip/TipInsert';
import TipRead from './components/tip/TipRead';
import TipUpdate from './components/tip/TipUpdate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/member" element={<Member/>}></Route>
        <Route path='/tip/index' element={<TipIndex/>}></Route>
        <Route path='/tip/tipInsert' element={<TipInsert/>}></Route>
        <Route path='/tip/tipRead' element={<TipRead/>}></Route>
        <Route path='/tip/tipUpdate' element={<TipUpdate/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;