const jwt = require("jsonwebtoken");

const getEmail = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1]; // Assuming 'Bearer <token>'
    console.log("Token from headers:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret
    console.log("Decoded token:", decoded);

    req.user = {
      email: decoded.email,
      role: decoded.role,
      id: decoded.userId,
    };

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = getEmail;