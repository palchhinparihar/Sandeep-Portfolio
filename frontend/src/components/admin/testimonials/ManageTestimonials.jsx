import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { FiPlus, FiMessageSquare, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setTestimonials([]);
    } else {
      setTestimonials(data || []);
    }

    setLoading(false);
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

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Manage Testimonials
          </h1>
          <p className="text-gray-500 mt-2">
            View and add client testimonials.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/testimonials/add")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
        >
          <FiPlus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* Count */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 rounded-lg">
            <FiMessageSquare size={22} className="text-gray-700" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Testimonials</p>
            <p className="text-2xl font-semibold text-gray-900">
              {testimonials.length}
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-500">
          Loading testimonials...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          Failed to load testimonials: {error}
          <button
            onClick={fetchTestimonials}
            className="ml-3 underline font-medium"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && testimonials.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <FiMessageSquare
            size={36}
            className="mx-auto text-gray-400 mb-4"
          />
          <h2 className="text-lg font-semibold text-gray-800">
            No testimonials found
          </h2>
          <p className="text-gray-500 mt-2">
            Add your first testimonial to get started.
          </p>
        </div>
      )}

      {/* Testimonials List */}
      {!loading && !error && testimonials.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 bg-gray-100 rounded-full shrink-0">
                  <FiMessageSquare
                    size={20}
                    className="text-gray-700"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-gray-900 break-words">
                    {testimonial.name}
                  </h2>
                  <p className="text-sm text-gray-500 break-words">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-7 whitespace-pre-line break-words">
                {testimonial.feedback}
              </p>

              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500">
                <FiCalendar size={14} />
                <span>Added on {formatDate(testimonial.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;
