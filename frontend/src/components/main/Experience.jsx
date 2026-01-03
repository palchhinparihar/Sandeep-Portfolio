import Stepper, { Step } from "../common/Stepper";
import { experiences } from "../../data/experiences";

const Experience = ({ title }) => {
  return (
    <section id="experience" className="py-20 px-6 min-h-screen backdrop-blur-sm">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">{title}</h2>
        <div className="w-44 md:w-51 bg-white h-1 mx-auto mb-12"></div>

        <div data-aos="fade-up">
          <Stepper initialStep={1} backButtonText="Back" nextButtonText="Next">
          {experiences.map((experience, index) => (
            <Step key={index}>
              <div className="text-left md:p-6 rounded-xl bg-gray-800 shadow-lg transition duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">
                  {experience.title}
                </h3>

                {experience.duration && (
                  <p className="text-gray-300 text-base md:text-lg font-medium">
                    <span className="text-gray-400 font-semibold">Duration:</span> {experience.duration}
                  </p>
                )}

                <p className="text-gray-300 text-base md:text-lg mt-4 leading-relaxed">
                  {experience.description}
                </p>

                <ul className="list-disc ml-6 mt-4 text-gray-200 space-y-2 marker:text-blue-400 text-base md:text-[17px] leading-relaxed">
                  {experience.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </Step>
          ))}
        </Stepper>
        </div>
      </div>
    </section>
  );
};

export default Experience;