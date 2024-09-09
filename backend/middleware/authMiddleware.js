const jwt = require("jsonwebtoken");

function authorizeRoles(allowedRoles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "You do not have the required permissions" });
      }

      req.user = decoded; // Attach user info to request object
      next();
    } catch (error) {
      res.status(403).json({ message: "Token invalid or expired" });
    }
  };
}

module.exports = authorizeRoles

