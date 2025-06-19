const Experience = ({ title }) => {
  return (
    <section id="experience" className="py-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">{title}</h2>
        <div className="w-40 bg-white h-1 mx-auto mb-12"></div>

        {/* Interpreter Role */}
        <div className="mb-12 text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Korean-English Interpreter (2003–Present)</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Worked with leading companies and government agencies like <strong>Hyundai, LG, Samsung, POSCO</strong>, the <strong>Embassy of Korea</strong>, CII, and various Indian ministries.
            Provided simultaneous and consecutive interpretation across:
          </p>
          <ul className="list-disc ml-6 mt-3 text-gray-300 space-y-2">
            <li>UX R&D sessions at Hyundai Namyang (via IPSOS, TOLUNA)</li>
            <li>Finance interpretation for NH Capital, IFFCO Kisan</li>
            <li>Interior/Exterior design evaluations & EV infrastructure projects</li>
          </ul>
        </div>

        {/* GMP Consultant Role */}
        <div className="text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">GMP Consultant & Audit Interpreter (2018–Present)</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Acted as GMP consultant and MFDS (Korean FDA) interpreter for over 20+ audits, both virtual and on-site. Provided pre-audit consultation and technical interpretation for major Indian pharma manufacturers.
          </p>
          <ul className="list-disc ml-6 mt-3 text-gray-300 space-y-2">
            <li>Extensive knowledge of GMP, QA, and API compliance</li>
            <li>Clients include: Mylan, Mankind, Laurus Labs, Dr. Reddy’s, Emcure, Sun Pharma, Macleods, and more</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
