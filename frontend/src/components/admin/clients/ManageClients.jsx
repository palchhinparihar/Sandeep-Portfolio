import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiAlertCircle,
  FiArrowLeft,
} from "react-icons/fi";

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching clients:", error);
      setErrorMessage(error.message);
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
      setErrorMessage(error.message);
      return;
    }

    setErrorMessage("");
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== id)
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] px-4 py-10 text-white sm:px-6 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          to="/admin"
          aria-label="Back to dashboard"
          title="Back to dashboard"
          className="mb-6 inline-flex cursor-pointer items-center justify-center rounded-lg border border-blue-400/20 bg-[#07111f] p-2 text-slate-400 transition hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        >
          <FiArrowLeft size={18} aria-hidden="true" />
        </Link>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 border-b border-blue-400/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-400">
              Portfolio content
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Clients
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Manage the clients displayed on your portfolio.
            </p>
          </div>

          <Link
            to="/admin/clients/add"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          >
            <FiPlus className="mr-1.5" aria-hidden="true" />
            Add Client
          </Link>
        </div>

        {/* Clients List */}
        <div className="rounded-2xl p-4 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
          {errorMessage ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
            >
              <FiAlertCircle className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
              <div>
                <p className="font-semibold">Client action failed</p>
                <p className="mt-1 text-red-200/80">{errorMessage}</p>
              </div>
            </div>
          ) : loading ? (
            <div className="p-6 text-slate-400">
              Loading clients...
            </div>
          ) : clients.length === 0 ? (
            <div className="p-6 text-slate-400">
              No clients found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col justify-between rounded-xl border border-blue-400/20 bg-[#07111f]/85 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/5 hover:shadow-[0_16px_40px_rgba(37,99,235,0.14)]"
                >
                  <p className="break-words text-lg font-semibold leading-snug text-white">
                    {client.name}
                  </p>

                  <div className="flex items-center justify-end gap-2 border-t border-blue-400/10 pt-4">
                    <Link
                      to={`/admin/clients/edit/${client.id}`}
                      aria-label={`Edit ${client.name}`}
                      title={`Edit ${client.name}`}
                      className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                    >
                      <FiEdit2 aria-hidden="true" size={16} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(client.id)}
                      aria-label={`Delete ${client.name}`}
                      title={`Delete ${client.name}`}
                      className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-red-400/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                    >
                      <FiTrash2 aria-hidden="true" size={16} />
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