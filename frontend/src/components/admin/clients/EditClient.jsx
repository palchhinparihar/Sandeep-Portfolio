import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { supabase } from "../../../lib/supabase";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchClient = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching client:", error);
      setLoading(false);
      return;
    }

    setName(data.name || "");
    setLoading(false);
  };

  useEffect(() => {
    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    setSaving(true);

    const { error } = await supabase
      .from("clients")
      .update({
        name: name.trim(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating client:", error);
      setSaving(false);
      return;
    }

    navigate("/admin/clients");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-gray-600">Loading client...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/admin/clients")}
          aria-label="Back to clients"
          title="Back to clients"
          className="mb-6 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <FiArrowLeft size={18} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Edit Client
          </h1>

          <p className="mt-2 text-gray-600">
            Update the client name displayed on your portfolio.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-900"
            />
          </div>

          {/* Save */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
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