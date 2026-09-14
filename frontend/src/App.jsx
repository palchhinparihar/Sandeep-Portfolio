import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Toastify from "./components/common/Toastify";
import ScrollToTop from "./components/common/ScrollToTop";
import Main from "./components/Main";
import Footer from "./components/common/Footer";
import Login from "./components/admin/Login";

import AOS from 'aos';
import 'aos/dist/aos.css';


const App = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  
  const portfolio = (
    <>
      <Navbar title="Sandeep Singh" />
      <ScrollToTop />
      <Main />
      <Footer />
    </>
  );

  return (
    <BrowserRouter>
      <Toastify />
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="*" element={portfolio} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;