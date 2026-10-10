import { supabase } from "../lib/supabase";

// Fetch all testimonials
export const getTestimonials = async () => {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      testimonials: data || [],
      message: "Testimonials fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching testimonials:", error);

    return {
      testimonials: [],
      message: error.message || "An error occurred while fetching testimonials",
    };
  }
};

// Add a new testimonial (public users)
export const addTestimonial = async (testimonialData) => {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .insert([testimonialData])
      .select()
      .single();

    if (error) throw error;

    return {
      testimonial: data,
      message: "Testimonial added successfully",
    };
  } catch (error) {
    console.error("Error adding testimonial:", error);

    return {
      message: error.message || "An error occurred while adding testimonial",
    };
  }
};