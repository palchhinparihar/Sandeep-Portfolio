import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const Clients = ({ title }) => {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("id, name")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching clients:", error);
      return;
    }

    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <section
      id="clients"
      className="py-20 backdrop-blur-sm overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400">
          {title}
        </h2>

        <div className="w-28 md:w-33 h-1 bg-white mx-auto mt-3"></div>
      </div>

      <div className="relative w-full bg-gray-900 py-14">
        {clients.length > 0 && (
          <div className="flex gap-5 animate-scroll whitespace-nowrap px-6">
            {clients.concat(clients).map((client, index) => (
              <span
                key={`${client.id}-${index}`}
                className="inline-block px-6 py-2 bg-gray-800 text-white rounded-lg text-sm md:text-[16px] font-medium shadow hover:bg-blue-600 transition"
              >
                {client.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Clients;