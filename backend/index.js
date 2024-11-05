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

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("server running");
});

//auth routes
app.use("/api/auth/user", userAuthRoute);
app.use("/api/auth/company", companyAuthRoute);
app.post("/api/auth/refresh", AuthController.refreshAccessToken);
app.post("/api/auth/login", AuthController.login);

// other routes
app.use("/api/users", userRoute);
app.use("/api/companies", companyRoute);
app.use("/api/verify-token", tokensRoute);

//review route
app.use("/api/reviews", reviewRoute);

//get review sentiment score
app.post("/api/sentiment", async (req, res) => {
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
