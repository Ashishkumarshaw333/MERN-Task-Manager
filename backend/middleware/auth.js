// auth.js - Middleware that checks whether the request includes a valid JWT token
// Routes using this middleware cannot be accessed without logging in

const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // The token is sent in the "Authorization" header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid." });
  }

  const token = authHeader.split(" ")[1]; // Extract the actual token after "Bearer"

  try {
    // Verify the token; if valid, this returns the decoded data (such as userId)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // The following route can use this userId
    next(); // Continue because the token is valid
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = authMiddleware;
