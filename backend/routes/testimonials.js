import express from "express";
import Testimonial from "../models/Testimonial.js";
import { capitalizeFirst } from "../utils.js";

const router = express.Router();

// ROUTE 1: GET "api/testimonials/"
// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    if (!testimonials) {
      return res.status(404).json({ success: false, message: "No testimonials found" });
    }

    res.status(200).json({ success: true, message: "Testimonials fetched successfully", testimonials });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: 'Interal Server Error', message: error.message });
  }
});

// ROUTE 2: POST "api/testimonials/"
// Add a new testimonial
router.post("/", async (req, res) => {
  const { personName, companyName, review } = req.body;

  try {
    if (!personName || !companyName || !review) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const newTestimonial = await Testimonial.create({
      personName: capitalizeFirst(personName),
      companyName: capitalizeFirst(companyName),
      review: capitalizeFirst(review)
    });
    
    res.status(201).json({ success: true, message: "Testimonial added successfully", testimonial: newTestimonial });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: 'Interal Server Error', message: error.message });
  }
});

export default router;