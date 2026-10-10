import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiEdit2,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { supabase } from "../../../lib/supabase";

const ManageExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchExperiences = async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Error fetching experiences:", error);
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setExperiences(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("experiences")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting experience:", error);
      setErrorMessage(error.message);
      return;
    }

    setErrorMessage("");
    setExperiences((previousExperiences) =>
      previousExperiences.filter((experience) => experience.id !== id)
    );
  };

  const formatDate = (date) => {
    if (!date) return "Present";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
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

        <div className="mb-10 flex flex-col gap-6 border-b border-blue-400/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-400">
              Portfolio content
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Experiences
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Manage the professional experience displayed on your portfolio.
            </p>
          </div>

          <Link
            to="/admin/experiences/add"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          >
            <FiPlus className="mr-1.5" aria-hidden="true" />
            Add Experience
          </Link>
        </div>

        <div className="rounded-2xl p-4 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
          {errorMessage ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
            >
              <FiAlertCircle className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
              <div>
                <p className="font-semibold">Experience action failed</p>
                <p className="mt-1 text-red-200/80">{errorMessage}</p>
              </div>
            </div>
          ) : loading ? (
            <div className="p-6 text-slate-400">Loading experiences...</div>
          ) : experiences.length === 0 ? (
            <div className="p-6 text-slate-400">
              No experiences found.
            </div>
          ) : (
            <div className="space-y-4">
              {experiences.map((experience) => (
                <article
                  key={experience.id}
                  className="rounded-xl border border-blue-400/20 bg-[#07111f]/85 p-5 transition hover:border-blue-400/50"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-white">
                        {experience.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {formatDate(experience.start_date)} -{" "}
                        {experience.is_current
                          ? "Present"
                          : formatDate(experience.end_date)}
                      </p>
                      {experience.is_current && (
                        <span className="mt-2 inline-block rounded-full bg-green-400/10 px-2.5 py-1 text-xs font-medium text-green-300">
                          Current
                        </span>
                      )}
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">
                        {experience.description}
                      </p>
                      {experience.points?.length > 0 && (
                        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-400">
                          {experience.points.map((point, index) => (
                            <li key={`${experience.id}-${index}`}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex shrink-0 items-start gap-2">
                      <Link
                        to={`/admin/experiences/edit/${experience.id}`}
                        aria-label={`Edit ${experience.title}`}
                        title="Edit experience"
                        className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                      >
                        <FiEdit2 aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(experience.id)}
                        aria-label={`Delete ${experience.title}`}
                        title="Delete experience"
                        className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-red-400/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                      >
                        <FiTrash2 aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageExperiences;
