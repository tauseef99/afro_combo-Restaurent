const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Ensure the token exists
  if (!token) {
    return res.status(401).json({ message: "Access Denied, No Token Provided" });
  }

  try {
    // Verify the token
    const verified = jwt.verify(token.split(" ")[1], "SECRET_KEY");  // Get token without "Bearer "
    req.user = verified; // Save the user info (or admin info) from the token
    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
