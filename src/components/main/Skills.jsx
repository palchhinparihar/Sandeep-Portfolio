import { skills } from "../../data/skills";

const Skills = ({ title }) => {
  return (
    <section id="skills" className="py-24 px-6 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">{title}</h2>
        <div className="w-58 md:w-70 h-1 bg-white mx-auto mb-12"></div>
      </div>

      <div className="md:w-[85%] mx-auto grid gap-10 md:grid-cols-3">
        {skills.map((group, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow p-8 min-h-[280px] hover:shadow-blue-500/30 transition hover:scale-105 duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-6 border-b border-gray-700 pb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap justify-start items-center gap-x-3 gap-y-6">
              {group.items.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 rounded-full bg-gray-700 hover:bg-blue-600 transition text-gray-100 border border-gray-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
