import { TypeAnimation } from 'react-type-animation';

const Home = ({ title }) => {
  return (
    <section id="home" className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
      <h1 data-aos="fade-down" className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        <span>Hi, </span>
        <span className="text-blue-500">{title}</span>
        <span> here!</span>
      </h1>

      <p data-aos="fade-in" className="text-xl md:text-4xl min-h-8 md:min-h-12 text-gray-200 mt-5 mb-6 font-semibold">
        <TypeAnimation
          sequence={["Korean Language Interpreter", 1500, "GMP Consultant", 1500, "Cross-Cultural Expert", 1500]}
          wrapper="span" cursor={false} repeat={Infinity}
        />
      </p>

      <p  data-aos="fade-in" className="text-base md:text-lg text-gray-400 max-w-xl mb-8">
        Bridging Korean and Indian industries for 20+ years through expert interpretation, GMP audits, and cultural liaison.
      </p>

      <div data-aos="fade-up" className="flex flex-col md:flex-row justify-center items-center gap-4">
        <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center">
          <i className="fa-solid fa-message mr-2"></i>
          <span>Contact Me</span>
        </a>
        <a
          href="/Sandeep Singh (Interpretation) CV.docx"
          download
          className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 px-6 rounded-lg transition flex items-center"
        >
          <i className="fas fa-download mr-2"></i>
          <span>Download CV</span>
        </a>
      </div>
    </section>

  )
}

export default Home;