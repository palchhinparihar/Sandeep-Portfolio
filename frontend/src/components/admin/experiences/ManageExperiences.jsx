import { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit2,
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

const ManageExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setExperiences(data || []);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "is_current" && checked ? { end_date: "" } : {}),
    }));
  };

  const handlePointChange = (index, value) => {
    setForm((prev) => {
      const points = [...prev.points];
      points[index] = value;

      return { ...prev, points };
    });
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

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const handleEdit = (experience) => {
    setForm({
      title: experience.title || "",
      start_date: experience.start_date || "",
      end_date: experience.end_date || "",
      is_current: experience.is_current || false,
      description: experience.description || "",
      points:
        Array.isArray(experience.points) && experience.points.length
          ? experience.points
          : [""],
    });

    setEditingId(experience.id);
    setShowForm(true);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
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
      setSaving(false);
      return;
    }

    if (payload.end_date && payload.end_date < payload.start_date) {
      setError("End date cannot be earlier than start date.");
      setSaving(false);
      return;
    }

    const result = editingId
      ? await supabase
          .from("experiences")
          .update(payload)
          .eq("id", editingId)
      : await supabase.from("experiences").insert([payload]);

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    resetForm();
    await fetchExperiences();
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) return;

    setError("");

    const { error } = await supabase
      .from("experiences")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  const formatDate = (date) => {
    if (!date) return "Present";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Manage Experience</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add, edit, and manage your professional experience.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm text-white transition hover:bg-gray-800"
        >
          <FiPlus />
          Add Experience
        </button>
      </div>

      {error && (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <FiX />
          </button>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Experience" : "Add Experience"}
            </h2>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg p-2 hover:bg-gray-100"
              aria-label="Close form"
            >
              <FiX />
            </button>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Title *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Full Stack Developer"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Start Date *
              </label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
              />
              <p className="mt-1 text-xs text-gray-500">
                Choose the first day of the month.
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                disabled={form.is_current}
                min={form.start_date || undefined}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600 disabled:bg-gray-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty if not applicable.
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="is_current"
              checked={form.is_current}
              onChange={handleChange}
              className="h-4 w-4"
            />
            This is my current experience
          </label>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your role and responsibilities..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="text-sm font-medium">Key Points</label>

              <button
                type="button"
                onClick={addPoint}
                className="inline-flex items-center gap-1 text-sm font-medium hover:text-gray-500"
              >
                <FiPlus />
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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
                  />

                  <button
                    type="button"
                    onClick={() => removePoint(index)}
                    disabled={form.points.length === 1}
                    className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={`Remove point ${index + 1}`}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
            >
              <FiSave />
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Experience"
                  : "Save Experience"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="py-10 text-center text-sm text-gray-500">
          Loading experiences...
        </p>
      ) : experiences.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
          <p className="font-medium">No experiences added yet.</p>
          <p className="mt-1 text-sm text-gray-500">
            Click "Add Experience" to create your first entry.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <article
              key={experience.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">
                    {experience.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {formatDate(experience.start_date)} –{" "}
                    {experience.is_current
                      ? "Present"
                      : formatDate(experience.end_date)}
                  </p>

                  {experience.is_current && (
                    <span className="mt-2 inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                      Current
                    </span>
                  )}

                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-700">
                    {experience.description}
                  </p>

                  {experience.points?.length > 0 && (
                    <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-600">
                      {experience.points.map((point, index) => (
                        <li key={`${experience.id}-${index}`}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex shrink-0 items-start gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(experience)}
                    className="rounded-lg border border-gray-200 p-2.5 hover:bg-gray-100"
                    aria-label={`Edit ${experience.title}`}
                    title="Edit experience"
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(experience.id)}
                    className="rounded-lg border border-gray-200 p-2.5 text-red-600 hover:bg-red-50"
                    aria-label={`Delete ${experience.title}`}
                    title="Delete experience"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageExperiences;