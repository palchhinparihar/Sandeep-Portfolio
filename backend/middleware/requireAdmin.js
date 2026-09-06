import jsonwebtoken from "jsonwebtoken";

const requireAdmin = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    if (!decoded || decoded.email.trim().toLowerCase() !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) {
      return res.status(403).json({ success: false, message: "Access denied. Only admin can access this route." });
    }
    req.admin = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token.", error: err.message });
  }
};

export default requireAdmin;