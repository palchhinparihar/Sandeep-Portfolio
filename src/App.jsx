import Navbar from "./components/common/Navbar";
import ScrollToTop from "./components/common/ScrollToTop";
import Particles from "./components/common/Particles";
import Home from "./components/main/Home";
import About from "./components/main/About";
import Experience from "./components/main/Experience";
import Certificates from "./components/main/Certificates";
import Clients from "./components/main/Clients";
import Skills from "./components/main/Skills";
import Contact from "./components/main/Contact";
import Footer from "./components/common/Footer";

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
      <ScrollToTop />

      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <main className="min-h-screen text-white">
        <Home title="Sandeep Singh" />
        <About title="About Me" />
        <Experience title="Experience" />
        <Certificates title="Certificates" />
        <Clients title="Clients" />
        <Skills title="Technical Skills" />
        <Contact title="Contact Me" />
      </main>

      <Footer />
    </>
  )
}

export default App;