import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTestimonials } from "../../../api/testimonials";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiMessageSquare,
} from "react-icons/fi";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [expandedTestimonials, setExpandedTestimonials] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTestimonials = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getTestimonials();

      if (
        result.message !== "Testimonials fetched successfully" &&
        result.message
      ) {
        setError(result.message);
        setTestimonials([]);
      } else {
        setTestimonials(result.testimonials || []);
      }
    } catch (fetchError) {
      setError(fetchError.message || "Unable to load testimonials.");
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const toggleReview = (id) => {
    setExpandedTestimonials((previousExpanded) => {
      const nextExpanded = new Set(previousExpanded);

      if (nextExpanded.has(id)) {
        nextExpanded.delete(id);
      } else {
        nextExpanded.add(id);
      }

      return nextExpanded;
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
              Testimonials
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
              Manage the client testimonials displayed on your portfolio.
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-4 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-6">
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue-400/20 bg-[#07111f]/85 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-500/10 text-blue-400">
              <FiMessageSquare size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                Total testimonials
              </p>
              <p className="text-2xl font-semibold text-white">
                {testimonials.length}
              </p>
            </div>
          </div>

          {error ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
            >
              <FiAlertCircle
                className="mt-0.5 shrink-0 text-red-300"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold">Testimonial action failed</p>
                <p className="mt-1 text-red-200/80">{error}</p>
                <button
                  type="button"
                  onClick={fetchTestimonials}
                  className="mt-2 font-medium text-red-200 underline underline-offset-2 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300/40"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : loading ? (
            <div className="p-6 text-slate-400">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="rounded-xl border border-blue-400/20 bg-[#07111f]/85 p-10 text-center">
              <FiMessageSquare
                size={36}
                className="mx-auto mb-4 text-slate-500"
                aria-hidden="true"
              />
              <h2 className="text-lg font-semibold text-white">
                No testimonials found
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="rounded-xl border border-blue-400/20 bg-[#07111f]/85 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/5 hover:shadow-[0_16px_40px_rgba(37,99,235,0.14)]"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-400">
                      <FiMessageSquare size={18} aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="break-words font-semibold text-white">
                        {testimonial.name}
                      </h2>
                      <p className="break-words text-sm text-slate-400">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {(() => {
                    const review = testimonial.review || "";
                    const isExpanded = expandedTestimonials.has(testimonial.id);
                    const shouldTruncate = review.length > 55;

                    return (
                      <div>
                        <p className="break-words whitespace-pre-line text-sm leading-7 text-slate-300">
                          {shouldTruncate && !isExpanded
                            ? `${review.slice(0, 50)}...`
                            : review}
                        </p>

                        {shouldTruncate && (
                          <button
                            type="button"
                            onClick={() => toggleReview(testimonial.id)}
                            className="mt-2 cursor-pointer text-sm font-medium text-blue-400 transition hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                          >
                            {isExpanded ? "Show less" : "Show more"}
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  <div className="mt-5 flex items-center gap-2 border-t border-blue-400/10 pt-4 text-xs text-slate-500">
                    <FiCalendar size={14} aria-hidden="true" />
                    <span>Added on {formatDate(testimonial.created_at)}</span>
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

export default ManageTestimonials;
