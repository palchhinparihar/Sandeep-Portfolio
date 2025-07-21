import { useEffect, useState } from "react";
import { getTestimonials, addTestimonial } from "../../api/testimonials";
import AddTestimonial from "./AddTestimonial";

const Testimonials = ({ title }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ personName: "", companyName: "", review: "" });

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true); // Start loading
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTestimonials();
  }, []);


  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTestimonial = await addTestimonial(formData);
      setTestimonials([newTestimonial, ...testimonials]);

      setFormData({ personName: "", companyName: "", review: "" });
    } catch (err) {
      console.error("Error adding testimonial:", err);
    }
  };

  return (
    <section id="testimonials" className="py-20 px-6 min-h-[80vh] backdrop-blur-sm">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-3">{title}</h2>
        <div className="w-44 md:w-76 bg-white h-1 mx-auto mb-12"></div>

        {/* Testimonial Form */}
        <div className="mb-15">
          <AddTestimonial handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} />
        </div>

        {/* Render Testimonials */}
        {loading ? (
          <div className="text-gray-500">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-lg md:text-2xl font-semibold text-gray-400">No testimonials yet. Add One.</div>
        ) : (
          <div className="flex overflow-x-auto gap-6 pb-4 px-1 snap-x snap-mandatory scroll-smooth">
            {testimonials.map((t, index) => (
              <div
                key={t._id || index}
                className="min-w-full md:min-w-1/3 bg-gray-800 p-6 rounded-xl shadow hover:shadow-blue-500/30 transition flex flex-col items-center gap-4"
              >
                <h5 className="text-lg md:text-xl font-medium text-blue-400">{t.personName}</h5>
                <p className="text-sm md:text-lg text-gray-200 mb-2 truncate">{t.companyName}</p>
                <p className="italic text-gray-300">
                  {(t.review || "").length > 100 ? `${t.review.slice(0, 100)}...` : t.review}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;