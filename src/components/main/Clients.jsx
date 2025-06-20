import { clients } from "../../data/clients";

const Clients = ({ title }) => {
  return (
    <section id="clients" className="py-20 backdrop-blur-sm overflow-hidden">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400">{title}</h2>
        <div className="w-28 md:w-33 h-1 bg-white mx-auto mt-3"></div>
      </div>

      <div className="relative w-full bg-gray-800 py-12">
        <div className="flex gap-5 animate-scroll whitespace-nowrap px-6">
          {clients.concat(clients).map((client, index) => (
            <span key={index} className="inline-block px-6 py-2 bg-gray-900 text-white rounded-xl text-sm md:text-[16px] font-medium shadow hover:bg-blue-600 transition">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
