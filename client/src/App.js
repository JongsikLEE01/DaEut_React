import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import LoginContextProvider from './contexts/LoginContextProvider';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      {/* <LoginContextProvider> */}
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      {/* </LoginContextProvider> */}
    </BrowserRouter>
  );
}

export default App;
