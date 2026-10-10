import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiPlus,
  FiSave,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { supabase } from "../../../lib/supabase";

const EditExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: "",
    points: [""],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchExperience = async () => {
      if (!id) {
        setError("Experience ID is missing.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message || "Failed to load experience.");
        setLoading(false);
        return;
      }

      setFormData({
        title: data.title || "",
        start_date: data.start_date?.slice(0, 7) || "",
        end_date: data.end_date?.slice(0, 7) || "",
        is_current: data.is_current ?? false,
        description: data.description || "",
        points:
          Array.isArray(data.points) && data.points.length > 0
            ? data.points
            : [""],
      });

      setLoading(false);
    };

    fetchExperience();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "is_current" && checked ? { end_date: "" } : {}),
    }));
  };

  const handlePointChange = (index, value) => {
    setFormData((prev) => {
      const updatedPoints = [...prev.points];
      updatedPoints[index] = value;

      return { ...prev, points: updatedPoints };
    });
  };

  const addPoint = () => {
    setFormData((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  };

  const removePoint = (index) => {
    setFormData((prev) => ({
      ...prev,
      points: prev.points.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.end_date &&
      formData.start_date &&
      formData.end_date < formData.start_date
    ) {
      setError("End date cannot be earlier than the start date.");
      return;
    }

    setSaving(true);

    const payload = {
      title: formData.title.trim(),
      start_date: `${formData.start_date}-01`,
      end_date: formData.is_current
        ? null
        : formData.end_date
          ? `${formData.end_date}-01`
          : null,
      is_current: formData.is_current,
      description: formData.description.trim(),
      points: formData.points
        .map((point) => point.trim())
        .filter(Boolean),
    };

    const { error } = await supabase
      .from("experiences")
      .update(payload)
      .eq("id", id);

    setSaving(false);

    if (error) {
      setError(error.message || "Failed to update experience.");
      return;
    }

    setSuccess("Experience updated successfully.");

    setTimeout(() => {
      navigate(-1);
    }, 800);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-[#020813]/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";

  const labelClass = "mb-2 block text-sm font-medium text-slate-300";

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
        onClick={() => navigate(-1)}
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
          Edit Experience
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
          Update your professional experience and responsibilities.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
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

      {success && (
        <div
          role="status"
          className="mb-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200"
        >
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-blue-400/20 bg-[#07111f]/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8"
      >
        <div>
          <label htmlFor="title" className={labelClass}>
            Experience Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. Web Developer"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="start_date" className={labelClass}>
              Start Date *
            </label>
            <input
              id="start_date"
              name="start_date"
              type="month"
              value={formData.start_date}
              onChange={handleChange}
              max={
                !formData.is_current && formData.end_date
                  ? formData.end_date
                  : undefined
              }
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="end_date" className={labelClass}>
              End Date {!formData.is_current && "*"}
            </label>
            <input
              id="end_date"
              name="end_date"
              type="month"
              value={formData.end_date}
              onChange={handleChange}
              min={formData.start_date || undefined}
              disabled={formData.is_current}
              required={!formData.is_current}
              className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-800`}
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-slate-300">
          <input
            type="checkbox"
            name="is_current"
            checked={formData.is_current}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-700 accent-blue-500"
          />
          <span className="text-sm text-slate-300">
            I currently work here
          </span>
        </label>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={inputClass}
            placeholder="Describe your role and experience..."
            required
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-slate-300">
              Key Responsibilities / Achievements
            </label>

            <button
              type="button"
              onClick={addPoint}
              className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              <FiPlus />
              Add Point
            </button>
          </div>

          <div className="space-y-3">
            {formData.points.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <textarea
                  value={point}
                  onChange={(e) =>
                    handlePointChange(index, e.target.value)
                  }
                  rows={2}
                  className={inputClass}
                  placeholder={`Achievement or responsibility ${index + 1}`}
                  aria-label={`Achievement or responsibility ${index + 1}`}
                />

                <button
                  type="button"
                  onClick={() => removePoint(index)}
                  disabled={formData.points.length === 1}
                  className="mt-2 cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Remove point ${index + 1}`}
                  title="Remove point"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-blue-400/10 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer rounded-lg border border-blue-400/20 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-blue-500/10 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave />
            {saving ? "Saving..." : "Update Experience"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditExperience;