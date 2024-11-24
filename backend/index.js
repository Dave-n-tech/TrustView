require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const reviewRoute = require("./routes/reviewRoute");
const userAuthRoute = require("./routes/auth/userAuthRoute");
const companyAuthRoute = require("./routes/auth/companyAuthRoute");
const AuthController = require("./controllers/authController");
const userRoute = require("./routes/userRoute");
const companyRoute = require("./routes/companyRoute");
const tokensRoute = require("./routes/tokensRoute");
const cors = require("cors");
const { getSentimentScore } = require("./utils/getSentimentScore");
const { generateReviewToken } = require("./utils/generateToken");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173", "https://trust-view.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("server running");
});

//auth routes
app.use("/auth/user", userAuthRoute);
app.use("/auth/company", companyAuthRoute);
app.post("/auth/refresh", AuthController.refreshAccessToken);
app.post("/auth/login", AuthController.login);

// other routes
app.use("/users", userRoute);
app.use("/companies", companyRoute);
app.use("/verify-token", tokensRoute);

//review route
app.use("/reviews", reviewRoute);

// get review token for invite
app.get("/invite-token", (req, res) => {
  const { email } = req.body;
  const token = generateReviewToken({email})
  res.json(token)
});

//get review sentiment score
app.post("/sentiment", async (req, res) => {
  const review = req.body.review;

  try {
    const sentiment = await getSentimentScore(review);
    res.json(sentiment);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error getting sentiment result from gemini",
        error: error,
      });
  }
});




const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`server running on port ${port || process.env.PORT}`);
});
