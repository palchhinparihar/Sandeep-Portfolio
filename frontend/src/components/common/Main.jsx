import Particles from "./Particles"
import Home from "../main/Home"
import About from "../main/About"
import Experience from "../main/Experience";
import Certificates from "../main/Certificates";
import Clients from "../main/Clients";
import Skills from "../main/Skills";
import Contact from "../main/Contact";
import Testimonials from "../main/Testimonials";

const Main = () => {
  return (
    <>
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
        <Testimonials title="What People Say" />
        <Clients title="Clients" />
        <Skills title="Technical Skills" />
        <Contact title="Contact Me" />
      </main>
    </>
  )
}

export default Main;