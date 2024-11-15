const hashPassword = require("../utils/hashPassword");
const User = require("../models/userModel");
const Company = require("../models/companyModel");
const jwt = require("jsonwebtoken")
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const AuthController = {
  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await hashPassword.hash(password);
      const newUser = await User.create([username, email, hashedPassword, 'user']);
      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      res.status(201).json({
        message: "user registered successfully",
        user: {
          id: newUser,
          username: username,
          email: email,
          role: "user"
        },
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error });
    }
  },

  async registerCompany(req, res) {
    try {
      const { name, email, password, website, phone_number, address } = req.body;
      const hashedPassword = await hashPassword.hash(password);
      const newCompany = await Company.create([
        name,
        email,
        hashedPassword,
        website,
        phone_number,
        address,
        'company'
      ]);
      const accessToken = generateAccessToken(newCompany);
      const refreshToken = generateRefreshToken(newCompany);

      res.status(201).json({
        message: "company account created",
        user: {
          id: newCompany,
          email: email,
          phoneNo: phone_number,
          address: address,
          role: "company"
        },
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating company account", error: error });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let userOrCompany;

      userOrCompany = await User.getByEmail(email);
      if (!userOrCompany) {
        userOrCompany = await Company.getByEmail(email);
        if (!userOrCompany) {
          return res.status(401).json({ message: "invalid email" });
        }
      }

      const passwordFound = await hashPassword.compare(
        password,
        userOrCompany.password
      );

      if (!passwordFound) {
        return res.status(401).json({ message: "invalid password" });
      }

      const accessToken = generateAccessToken(userOrCompany);
      const refreshToken = generateRefreshToken(userOrCompany);

      res.status(200).json({
        message: "login successful",
        user: userOrCompany,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  },

  logout(req, res) {
    res.status(200).json({ accessToken, refreshToken });
  },

  async refreshAccessToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      let userOrCompany;

      // Check if the decoded token belongs to a user or a company
      if (decoded.role === "user") {
        userOrCompany = await User.getById(decoded.id);
      } else if (decoded.role === "company") {
        userOrCompany = await Company.getById(decoded.id);
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }

      if (!userOrCompany) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Generate a new access token
      const accessToken = generateAccessToken(userOrCompany);

      res.status(200).json({
        message: "New access token generated",
        access_token: accessToken,
      });
    } catch (error) {
      return res.status(403).json({ message: "Invalid refresh token", error: error.message });
    }
  }
};

module.exports = AuthController;
