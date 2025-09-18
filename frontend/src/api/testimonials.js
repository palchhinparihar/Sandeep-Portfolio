// const BASE_URL = "https://sandeep-portfolio-0z4a.onrender.com/api/testimonials";
const BASE_URL = "http://localhost:3000/api/testimonials";

// Fetch all testimonials
export const getTestimonials = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch testimonials");

    const data = await res.json();
    if (data.success) return { testimonials: data.testimonials, message: data.message || "Testimonials fetched successfully" };
  } catch (error) {
    return { message: error.message || "An error occurred while fetching testimonials" };
  }
};

// Add a new testimonial
export const addTestimonial = async (testimonialData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testimonialData),
    });
    if (!res.ok) throw new Error("Failed to add testimonial");

    const data = await res.json();
    if (data.success) return { testimonial: data.testimonial, message: data.message || "Testimonial added successfully" };
  } catch (error) {
    return { message: error.message || "An error occurred while adding testimonial" };
  }
};