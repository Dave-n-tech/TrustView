const jwt = require("jsonwebtoken");

const TokenController = {
  async verifyToken(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ message: "Authorization token is missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify the token using the same secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token is valid, attach the decoded data to the request
      const customer = decoded;
      return res.json({ message: "Token valid", customer });
    } catch (error) {
      console.log(error.message); // Log the specific error message
      return res.status(401).json({ message: "Invalid or expired token", error: error.message });
    }
  },
};

module.exports = TokenController;
