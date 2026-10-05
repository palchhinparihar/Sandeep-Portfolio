import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
      setLoading(false);
      return;
    }

    setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting client:", error);
      return;
    }

    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Clients
            </h1>

            <p className="mt-2 text-gray-600">
              Manage the clients displayed on your portfolio.
            </p>
          </div>

          <Link
            to="/admin/clients/add"
            className="rounded-lg cursor-pointer bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <FiPlus className="inline-block mr-1" />
            Add Client
          </Link>
        </div>

        {/* Clients List */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {loading ? (
            <div className="p-6 text-gray-600">
              Loading clients...
            </div>
          ) : clients.length === 0 ? (
            <div className="p-6 text-gray-600">
              No clients found.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <p className="font-medium text-gray-900">
                    {client.name}
                  </p>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/admin/clients/edit/${client.id}`}
                      className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-900"
                    >
                      <FiEdit2
                        aria-hidden="true"
                        size={16}
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(client.id)}
                      className="text-sm cursor-pointer font-medium text-red-600 hover:text-red-700"
                    >
                      <FiTrash2
                        aria-hidden="true"
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageClients;