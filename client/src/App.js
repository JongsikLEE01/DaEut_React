import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import LoginContextProvider from './contexts/LoginContextProvider';
import Home from './components/Home';
import Member from './pages/auth/Member'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/member" element={<Member/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;