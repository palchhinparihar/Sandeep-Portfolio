import { useEffect, useState } from "react";
import { getTestimonials, addTestimonial } from "../../api/testimonials";
import AddTestimonial from "./AddTestimonial";
import { toast } from "react-toastify";

const INITIAL_VISIBLE_COUNT = 3;
const LOAD_MORE_COUNT = 3;

const Testimonials = ({ title }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    review: "",
  });

  // Fetch testimonials from Supabase
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);

        const result = await getTestimonials();

        if (
          result.message !== "Testimonials fetched successfully" &&
          result.message
        ) {
          toast.error(result.message);
        }

        setTestimonials(result.testimonials || []);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast.error("Unable to load testimonials. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle expanded review
  const toggleReviewExpand = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Show more testimonials
  const handleShowMore = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((currentCount) => currentCount + LOAD_MORE_COUNT);
      setLoadingMore(false);
    }, 300);
  };

  // Show only the initial testimonials
  const handleShowLess = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  // Submit a new testimonial to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const testimonialData = {
      name: formData.name.trim(),
      company: formData.company.trim(),
      review: formData.review.trim(),
    };

    if (
      !testimonialData.name ||
      !testimonialData.company ||
      !testimonialData.review
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await addTestimonial(testimonialData);

      // The service returns { testimonial, message } on success.
      // Errors are returned as { message }.
      if (!result?.testimonial) {
        throw new Error(
          result?.message || "Failed to submit your testimonial."
        );
      }

      const newTestimonial = result.testimonial;

      // Add the newly submitted testimonial to the list immediately.
      setTestimonials((prev) => [
        newTestimonial,
        ...prev.filter((item) => item.id !== newTestimonial.id),
      ]);

      // Ensure the newly submitted testimonial is visible.
      setVisibleCount((prev) =>
        Math.max(prev, INITIAL_VISIBLE_COUNT)
      );

      setFormData({
        name: "",
        company: "",
        review: "",
      });

      toast.success(
        "Thank you! Your testimonial has been submitted successfully."
      );
    } catch (error) {
      console.error("Error adding testimonial:", error);

      toast.error(
        error.message || "Unable to submit your testimonial. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="testimonials"
      className="py-20 px-6 min-h-[80vh] backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">
          {title}
        </h2>

        <div className="w-44 md:w-76 bg-white h-1 mx-auto mb-12" />

        {/* Testimonial Form */}
        <div data-aos="fade-out" className="mb-15">
          <AddTestimonial
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Render Testimonials */}
        {loading ? (
          <div
            data-aos="fade-in"
            className="text-gray-500 animate-pulse"
          >
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div
            data-aos="fade-in"
            className="text-lg md:text-2xl font-semibold text-gray-400"
          >
            No testimonials yet. Add one.
          </div>
        ) : (
          <>
            <div
              data-aos="fade-up"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4 px-1"
            >
              {testimonials.slice(0, visibleCount).map((t, index) => {
                const testimonialId = t.id ?? `${t.name}-${index}`;
                const isExpanded = expandedReviews[testimonialId];
                const review = t.review || "";

                return (
                  <div
                    key={testimonialId}
                    className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-blue-500/30 transition flex flex-col items-center gap-4"
                  >
                    <h5 className="text-lg md:text-xl font-medium text-blue-400">
                      {t.name}
                    </h5>

                    <p className="text-sm md:text-lg text-gray-200 mb-2 truncate max-w-full">
                      {t.company}
                    </p>

                    <p className="italic text-gray-300 break-words">
                      {review.length > 80 ? (
                        <>
                          {isExpanded
                            ? review
                            : `${review.slice(0, 80)}...`}

                          <button
                            type="button"
                            onClick={() =>
                              toggleReviewExpand(testimonialId)
                            }
                            className="ml-2 text-blue-400 cursor-pointer hover:text-blue-300 font-medium underline"
                            aria-expanded={Boolean(isExpanded)}
                          >
                            {isExpanded ? "see less" : "see more"}
                          </button>
                        </>
                      ) : (
                        review
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Show More / Show Less */}
            {(visibleCount < testimonials.length ||
              visibleCount > INITIAL_VISIBLE_COUNT) && (
              <div className="mt-6">
                <div className="flex justify-center gap-3">
                  {visibleCount < testimonials.length &&
                    (loadingMore ? (
                      <div className="text-gray-500 animate-pulse">
                        Loading testimonials...
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleShowMore}
                        className="rounded-lg cursor-pointer bg-blue-500 px-5 py-2 font-medium text-white transition hover:bg-blue-400"
                      >
                        Show more
                      </button>
                    ))}

                  {visibleCount > INITIAL_VISIBLE_COUNT && (
                    <button
                      type="button"
                      onClick={handleShowLess}
                      className="rounded-lg cursor-pointer border border-blue-400 px-5 py-2 font-medium text-blue-400 transition hover:bg-blue-400 hover:text-white"
                    >
                      Show less
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;