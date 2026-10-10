import { useEffect, useState } from "react";
import Stepper, { Step } from "../layout/Stepper";
import { supabase } from "../../lib/supabase";

const Experience = ({ title }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error fetching experiences:", error);
        setError("Unable to load experiences right now.");
      } else {
        setExperiences(data || []);
      }

      setLoading(false);
    };

    fetchExperiences();
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date.slice(0, 7)}-01T00:00:00`)
      .toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
  };

  const getDuration = (experience) => {
    const start = formatDate(experience.start_date);

    if (!start) return "";

    const end = experience.is_current
      ? "Present"
      : formatDate(experience.end_date);

    return end ? `${start} – ${end}` : start;
  };

  return (
    <section
      id="experience"
      className="py-20 px-6 min-h-screen backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">
          {title}
        </h2>

        <div className="w-44 md:w-51 bg-white h-1 mx-auto mb-12"></div>

        <div data-aos="fade-up">
          {loading ? (
            <p className="text-gray-300 text-lg py-10">
              Loading experiences...
            </p>
          ) : error ? (
            <p role="alert" className="text-red-400 text-lg py-10">
              {error}
            </p>
          ) : experiences.length === 0 ? (
            <p className="text-gray-300 text-lg py-10">
              No experiences to display yet.
            </p>
          ) : (
            <Stepper
              key={experiences.map((experience) => experience.id).join(",")}
              initialStep={1}
              backButtonText="Back"
              nextButtonText="Next"
            >
              {experiences.map((experience) => (
                <Step key={experience.id}>
                  <div className="text-left md:p-6 p-4 rounded-xl bg-gray-800 shadow-lg transition duration-300">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 tracking-tight">
                      {experience.title}
                    </h3>

                    {getDuration(experience) && (
                      <p className="text-gray-300 text-base md:text-lg font-medium">
                        <span className="text-gray-400 font-semibold">
                          Duration:
                        </span>{" "}
                        {getDuration(experience)}
                      </p>
                    )}

                    <p className="text-gray-300 text-base md:text-lg mt-4 leading-relaxed whitespace-pre-line">
                      {experience.description}
                    </p>

                    {Array.isArray(experience.points) &&
                      experience.points.length > 0 && (
                        <ul className="list-disc ml-6 mt-4 text-gray-200 space-y-2 marker:text-blue-400 text-base md:text-[17px] leading-relaxed">
                          {experience.points.map((point, index) => (
                            <li key={`${experience.id}-${index}`}>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </Step>
              ))}
            </Stepper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;