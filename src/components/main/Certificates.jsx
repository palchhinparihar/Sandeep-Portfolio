import { certificates } from "../../data/certificates";

const Certificates = ({ title }) => {
  return (
    <section id="certificates" className="py-20 px-6 min-h-screen backdrop-blur-sm">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">{title}</h2>

        <div className="w-44 md:w-54 bg-white h-1 mx-auto mb-12"></div>

        {/* Language Certificates (Images) */}
        <h3 data-aos="fade-up" className="text-2xl mb-6 text-center">Language Certificates</h3>
        <div data-aos="zoom-in" className="grid gap-6 md:grid-cols-2 mb-12">
          {certificates.language.map((cert, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-xl shadow hover:shadow-blue-500/30 transition flex flex-col items-center gap-4">
              <h4 className="text-xl font-semibold text-white">{cert.title}</h4>
              <p className="text-gray-300">{cert.issuer}</p>
              <p className="text-gray-400 text-sm">Year: {cert.year}</p>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-[15px] flex justify-center items-center group">
                  <span className="group-hover:underline">View Certificate</span>
                  <i className="fa-solid fa-angles-right group-hover:animate-pulse ml-2" aria-hidden="true"></i>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Experience Certificates (Links) */}
        <h3 data-aos="fade-up" className="text-2xl text-white mb-6 text-center">Experience Certificates</h3>
        <div data-aos="zoom-in" className="grid gap-6 md:grid-cols-2">
          {certificates.experience.map((cert, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-blue-500/30 transition flex flex-col items-center gap-4">
              <h4 className="text-xl font-semibold text-white mb-2">{cert.title}</h4>
              <p className="text-gray-300">{cert.issuer}</p>
              <p className="text-gray-400 text-sm mb-3">Year: {cert.year}</p>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-[15px] flex justify-center items-center group">
                  <span className="group-hover:underline">View Certificate</span>
                  <i className="fa-solid fa-angles-right group-hover:animate-pulse ml-2" aria-hidden="true"></i>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
