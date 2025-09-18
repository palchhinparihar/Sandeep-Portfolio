import Navbar from "./components/common/Navbar";
import ScrollToTop from "./components/common/ScrollToTop";
import Main from "./components/common/Main";
import Footer from "./components/common/Footer";
import Toastify from "./components/common/Toastify";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  
  return (
    <>
      <Navbar title="Sandeep Singh" />
      <Toastify />
      <ScrollToTop />
      <Main />
      <Footer />
    </>
  )
}

export default App;