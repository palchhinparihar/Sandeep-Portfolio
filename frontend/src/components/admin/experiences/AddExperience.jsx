import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiX,
  FiSave,
} from "react-icons/fi";
import { supabase } from "../../../lib/supabase";

const initialForm = {
  title: "",
  start_date: "",
  end_date: "",
  is_current: false,
  description: "",
  points: [""],
};

const AddExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchExperience = async () => {
      const { data, error: fetchError } = await supabase
        .from("experiences")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error fetching experience:", fetchError);
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setForm({
        title: data.title || "",
        start_date: data.start_date || "",
        end_date: data.end_date || "",
        is_current: data.is_current || false,
        description: data.description || "",
        points:
          Array.isArray(data.points) && data.points.length
            ? data.points
            : [""],
      });
      setLoading(false);
    };

    fetchExperience();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "is_current" && checked ? { end_date: "" } : {}),
    }));
  };

  const handlePointChange = (index, value) => {
    setForm((prev) => ({
      ...prev,
      points: prev.points.map((point, i) =>
        i === index ? value : point
      ),
    }));
  };

  const addPoint = () => {
    setForm((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  };

  const removePoint = (index) => {
    setForm((prev) => ({
      ...prev,
      points: prev.points.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      title: form.title.trim(),
      start_date: form.start_date,
      end_date: form.is_current || !form.end_date ? null : form.end_date,
      is_current: form.is_current,
      description: form.description.trim(),
      points: form.points.map((point) => point.trim()).filter(Boolean),
    };

    if (!payload.title || !payload.start_date || !payload.description) {
      setError("Please fill in all required fields.");
      return;
    }

    if (
      payload.start_date.slice(-2) !== "01" ||
      (payload.end_date && payload.end_date.slice(-2) !== "01")
    ) {
      setError("Start date and end date must be the first day of the month.");
      return;
    }

    if (payload.end_date && payload.end_date < payload.start_date) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    setSaving(true);

    if (isEditing) {
      const { error: updateError } = await supabase
        .from("experiences")
        .update(payload)
        .eq("id", id);

      if (updateError) {
        console.error("Error updating experience:", updateError);
        setError(updateError.message);
        setSaving(false);
        return;
      }

      navigate("/admin/experiences");
      return;
    }

    // Get the current highest sort order before inserting a new experience.
    const { data: lastExperience, error: fetchError } = await supabase
      .from("experiences")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error("Error determining experience order:", fetchError);
      setError(fetchError.message);
      setSaving(false);
      return;
    }

    const nextSortOrder = (lastExperience?.sort_order ?? 0) + 1;
    const { error: insertError } = await supabase
      .from("experiences")
      .insert([{ ...payload, sort_order: nextSortOrder }]);

    if (insertError) {
      console.error("Error adding experience:", insertError);
      setError(insertError.message);
      setSaving(false);
      return;
    }

    navigate("/admin/experiences");
  };

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#020813] px-4 py-10 text-white sm:px-6 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_30%)]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-slate-400">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020813] px-4 py-10 text-white sm:px-6 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_30%)]" />
      <div className="relative mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => navigate("/admin/experiences")}
        aria-label="Back to experiences"
        title="Back to experiences"
        className="mb-6 inline-flex cursor-pointer items-center justify-center rounded-lg border border-blue-400/20 bg-[#07111f] p-2 text-slate-400 transition hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
      >
        <FiArrowLeft size={16} />
      </button>

      <div className="mb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-400">
          Portfolio content
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {isEditing ? "Edit Experience" : "Add Experience"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
          {isEditing
            ? "Update this professional experience."
            : "Add a new role, project, or professional experience."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-blue-400/20 bg-[#07111f]/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8"
      >
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
          >
            <FiAlertCircle className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
            <p className="flex-1">{error}</p>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
              className="cursor-pointer text-red-300 hover:text-red-100"
            >
              <FiX />
            </button>
          </div>
        )}

      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-300">
          Title *
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          maxLength={200}
          placeholder="e.g. Full Stack Developer"
          className="w-full rounded-lg border border-slate-700 bg-[#020813]/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="start_date"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Start Month *
          </label>
          <input
            id="start_date"
            type="month"
            name="start_date"
            value={form.start_date ? form.start_date.slice(0, 7) : ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                start_date: e.target.value
                  ? `${e.target.value}-01`
                  : "",
              }))
            }
            required
            className="w-full rounded-lg border border-slate-700 bg-[#020813]/70 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
          />
        </div>

        <div>
          <label
            htmlFor="end_date"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            End Month
          </label>
          <input
            id="end_date"
            type="month"
            name="end_date"
            value={form.end_date ? form.end_date.slice(0, 7) : ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                end_date: e.target.value
                  ? `${e.target.value}-01`
                  : "",
              }))
            }
            min={form.start_date ? form.start_date.slice(0, 7) : undefined}
            disabled={form.is_current}
            className="w-full rounded-lg border border-slate-700 bg-[#020813]/70 px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 disabled:bg-slate-800"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          name="is_current"
          checked={form.is_current}
          onChange={handleChange}
          className="h-4 w-4 accent-blue-500"
        />
        This is my current experience
      </label>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe your role and responsibilities..."
          className="w-full rounded-lg border border-slate-700 bg-[#020813]/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="text-sm font-medium text-slate-300">Key Points</label>

          <button
            type="button"
            onClick={addPoint}
            className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            <FiPlus size={16} />
            Add point
          </button>
        </div>

        <div className="space-y-2">
          {form.points.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={point}
                onChange={(e) =>
                  handlePointChange(index, e.target.value)
                }
                placeholder={`Key point ${index + 1}`}
                className="w-full rounded-lg border border-slate-700 bg-[#020813]/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />

              <button
                type="button"
                onClick={() => removePoint(index)}
                disabled={form.points.length === 1}
                className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={`Remove point ${index + 1}`}
              >
                <FiTrash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>

        <div className="flex flex-wrap justify-end gap-3 border-t border-blue-400/10 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/experiences")}
            disabled={saving}
            className="cursor-pointer rounded-lg border border-blue-400/20 px-4 py-2 text-sm text-slate-300 transition hover:bg-blue-500/10 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave size={16} />
            {saving ? "Saving..." : isEditing ? "Update Experience" : "Save Experience"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddExperience;