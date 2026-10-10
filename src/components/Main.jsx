import Galaxy from "./layout/Galaxy";
import Home from "./main/Home";
import About from "./main/About";
import Experience from "./main/Experience";
import Certificates from "./main/Certificates";
import Testimonials from "./main/Testimonials";
import Clients from "./main/Clients";
import Gallery from "./main/Gallery";
import Skills from "./main/Skills";
import Contact from "./main/Contact";

const Main = () => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      <main className="min-h-screen text-white">
        <Home title="Sandeep Singh" />
        <About title="About Me" />
        <Experience title="Experience" />
        <Certificates title="Certificates" />
        <Testimonials title="What People Say" />
        <Clients title="Clients" />
        <Gallery title="Gallery" />
        <Skills title="Technical Skills" />
        <Contact title="Contact Me" />
      </main>
    </>
  )
}

export default Main;