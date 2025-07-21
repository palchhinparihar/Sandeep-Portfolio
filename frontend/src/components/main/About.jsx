import profileImg from "../../assets/profile.jpeg";
import { languages } from "../../data/languages";

const About = ({ title }) => {
  return (
    <section id="about" className="py-20 px-6 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-400">{title}</h2>
        <div className="w-40 md:w-44 bg-white h-1 mx-auto"></div>
      </div>

      <div className="md:w-[87%] lg:w-[83%] mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-14">
        {/* Image Section */}
        <div
          data-aos="fade-right"
          className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer shadow-blue-950 shadow-xl md:shadow-[rgb(10, 25, 47)] hover:shadow-blue-900 transition duration-300"
        >
          <img
            src={profileImg}
            alt="Sandeep Singh"
            className="w-60 h-60 md:w-76 md:h-76 object-cover rounded-xl hover:scale-105 transition duration-300"
          />
        </div>

        <div data-aos="fade-left">
          <p className="md:text-xl text-gray-300 leading-relaxed">
            I'm <strong>Sandeep Singh</strong>, a seasoned <strong>Korean-English Interpreter</strong> and <strong>Korean Language Professional for GMP Audits in Pharmaceutical Companies</strong> with over <strong>20 years of experience</strong> across the automotive, pharmaceutical, and government sectors.
            I've worked with major organizations like Hyundai, LG, Samsung, POSCO, and Indian pharma leaders, enabling smooth communication, inspections, and regulatory compliance between India and Korea.
          </p>

          <p className="md:text-xl text-gray-300 leading-relaxed mt-6">
            I hold a Bachelor of Commerce from{" "}
            <a className="font-semibold text-blue-200" href="https://www.du.ac.in/" target="_blank">Delhi University</a>{" "}
            and a Korean Language Certificate from{" "}
            <a className="font-semibold text-blue-200" href="https://www.hanyang.ac.kr/web/eng" target="_blank">Hanyang University</a>, South Korea. {" "}
            I bring cultural insight, technical language fluency, and deep industry knowledge to every project I take on.
          </p>

          <div className="md:text-xl text-gray-300 leading-relaxed mt-6">
            <p>I also offer a wide range of document translation services in India for various languages such as:</p>
            <div className="flex flex-wrap mt-2 gap-2">
              {languages.map((language, index) => (
                <span key={index} className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs md:text-sm hover:bg-blue-700 transition duration-200">
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 text-left text-sm md:text-[16px] text-gray-200">
            <div>
              <h3 className="font-semibold text-white">Languages</h3>
              <ul className="list-disc ml-5 mt-2">
                <li>Korean (Proficient)</li>
                <li>English, Hindi, Punjabi (Native/Bilingual)</li>
                <li>Tamil (Basic - Verbal)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white">Location</h3>
              <p className="mt-2">India</p>

              <h3 className="font-semibold text-white mt-4">Education</h3>
              <ul className="list-disc ml-5 mt-2">
                <li>Delhi University - B.Com</li>
                <li>Hanyang University, South Korea - Korean Language</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
