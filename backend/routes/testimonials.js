import express from "express";

const router = express.Router();

// ROUTE 1: GET "api/testimonials/"
// Get all testimonials
router.get("/", async (req, res) => {
    res.send("Get all testimonials");
});

// ROUTE 2: POST "api/testimonials/"
// Add a new testimonial
router.get("/", async (req, res) => {
    res.send("Add a new testimonial");
});

export default router;