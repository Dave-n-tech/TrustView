const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

const generateReviewToken = (user) => {
  return jwt.sign(
    { name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1day",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateReviewToken,
};
