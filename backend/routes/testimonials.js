import express from "express";
import Testimonial from "../models/Testimonial.js";
import { capitalizeFirst } from "../utils.js";
import requireAdmin from "../middleware/requireAdmin.js";

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

// ROUTE 3: PATCH "api/testimonials/:id"
// Update a testimonial by ID
router.patch("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { personName, companyName, review } = req.body;

  try {
    if (!personName && !companyName && !review) {
      return res.status(400).json({ success: false, message: "Please provide at least one of the required fields." });
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        ...(personName && { personName: capitalizeFirst(personName) }),
        ...(companyName && { companyName: capitalizeFirst(companyName) }),
        ...(review && { review: capitalizeFirst(review) })
      },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    res.status(200).json({ success: true, message: "Testimonial updated successfully!", testimonial: updatedTestimonial });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: 'Interal Server Error', message: error.message });
  }
});

// ROUTE 4: DELETE "api/testimonials/:id"
// Delete a testimonial by ID
router.delete("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, message: "Testimonial deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, error: 'Interal Server Error', message: error.message });
  }
});    

export default router;