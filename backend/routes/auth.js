import express from "express";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

// ROUTE: POST "api/admin/login"
// Admin login route
router.post('/login', (req, res) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Enter a valid email address." });
  } else {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

    try {
      if (!adminEmail || email.trim().toLowerCase() !== adminEmail) {
        return res.status(403).json({
          success: false,
          message: "Access denied. Only admin can log in.",
        });
      }

      const token = jsonwebtoken.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.status(200).json({
        success: true,
        message: "Admin login successful.",
        role: 'admin',
        token
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "An error occurred while processing your request." });
    }
  }
});

export default router;