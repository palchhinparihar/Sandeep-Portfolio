import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiAlertCircle, FiArrowLeft, FiSave } from "react-icons/fi";
import { supabase } from "../../../lib/supabase";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchClient = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching client:", error);
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setName(data.name || "");
    setErrorMessage("");
    setLoading(false);
  };

  useEffect(() => {
    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    setSaving(true);
    setErrorMessage("");

    const { error } = await supabase
      .from("clients")
      .update({
        name: name.trim(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating client:", error);
      setErrorMessage(error.message);
      setSaving(false);
      return;
    }

    navigate("/admin/clients");
  };

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#020813] px-4 py-10 text-white sm:px-6 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_30%)]" />
        <div className="mx-auto max-w-2xl">
          <p className="relative text-slate-400">Loading client...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] px-4 py-10 text-white sm:px-6 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_30%)]" />
      <div className="relative mx-auto max-w-2xl">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/admin/clients")}
          aria-label="Back to clients"
          title="Back to clients"
          className="mb-6 inline-flex cursor-pointer items-center justify-center rounded-lg border border-blue-400/20 bg-[#07111f] p-2 text-slate-400 transition hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        >
          <FiArrowLeft size={18} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-400">
            Portfolio content
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Edit Client
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            Update the client name displayed on your portfolio.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-blue-400/20 bg-[#07111f]/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8"
        >
          {errorMessage && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
            >
              <FiAlertCircle className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
              <div>
                <p className="font-semibold">Unable to save client</p>
                <p className="mt-1 text-red-200/80">{errorMessage}</p>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Client Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter client name"
              required
              className="w-full rounded-lg border border-slate-700 bg-[#020813]/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
          </div>

          {/* Save */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave size={17} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClient;