require("dotenv").config()
const express = require("express")
const { connectDB } = require("./config/db")
const reviewRoute = require("./routes/reviewRoute")
const userAuthRoute = require("./routes/auth/userAuthRoute")
const companyAuthRoute = require("./routes/auth/companyAuthRoute")
const AuthController = require("./controllers/authController")

const app = express()
app.use(express.json())

connectDB()

app.get("/", (req, res) => {
    res.send("server running")
})

//auth routes
app.use("/api/auth/user", userAuthRoute)
app.use("/api/auth/company", companyAuthRoute)
app.post("/api/auth/refresh", AuthController.refreshAccessToken)
app.post("/api/auth/login", AuthController.login)

// app.use("/api/users")
// app.use("/api/companies")
// app.use("/api/tokens")


//review route
app.use("/api/reviews", reviewRoute)


const port = 3000
app.listen(process.env.PORT || port, () => {
    console.log(`server running on port ${port || process.env.PORT}`)
})