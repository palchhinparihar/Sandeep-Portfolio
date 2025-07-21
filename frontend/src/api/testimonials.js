const BASE_URL = "https://sandeep-portfolio-0z4a.onrender.com/api/testimonials";

// Fetch all testimonials
export const getTestimonials = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) throw new Error("Failed to fetch testimonials");
  
  const data = await res.json();
  return data.testimonials;
};

// Add a new testimonial
export const addTestimonial = async (testimonialData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testimonialData),
  });

  if (!res.ok) throw new Error("Failed to add testimonial");

  const data = await res.json();
  return data.testimonial;
};