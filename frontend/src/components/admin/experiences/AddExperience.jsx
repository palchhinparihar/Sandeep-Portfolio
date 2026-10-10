import { useState } from "react";
import { FiPlus, FiTrash2, FiX, FiSave } from "react-icons/fi";
import { supabase } from "../../../lib/supabase";

const initialForm = {
  title: "",
  start_date: "",
  end_date: "",
  is_current: false,
  description: "",
  points: [""],
};

const AddExperience = ({ onSuccess, onCancel }) => {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

    try {
      // Get the current highest sort order
      const { data: lastExperience, error: fetchError } = await supabase
        .from("experiences")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      const nextSortOrder = (lastExperience?.sort_order ?? 0) + 1;

      // Insert the new experience with its sort order
      const { error: insertError } = await supabase
        .from("experiences")
        .insert([
          {
            ...payload,
            sort_order: nextSortOrder,
          },
        ]);

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setForm(initialForm);

      if (onSuccess) {
        await onSuccess();
      }
    } catch {
      setError("Something went wrong while saving the experience.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Add Experience</h2>
          <p className="mt-1 text-sm text-gray-500">
            Add a new role, project, or professional experience.
          </p>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg p-2 transition hover:bg-gray-100"
            aria-label="Close form"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
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

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
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
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="start_date"
            className="mb-1 block text-sm font-medium"
          >
            Start Month *
          </label>
          <input
            id="start_date"
            type="month"
            name="start_date"
            value={form.start_date}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                start_date: e.target.value
                  ? `${e.target.value}-01`
                  : "",
              }))
            }
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="end_date"
            className="mb-1 block text-sm font-medium"
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
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600 disabled:bg-gray-100"
          />
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
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-600"
              />

              <button
                type="button"
                onClick={() => removePoint(index)}
                disabled={form.points.length === 1}
                className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={`Remove point ${index + 1}`}
              >
                <FiTrash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiSave size={16} />
          {saving ? "Saving..." : "Save Experience"}
        </button>
      </div>
    </form>
  );
};

export default AddExperience;