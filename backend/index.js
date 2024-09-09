require("dotenv").config()
const express = require("express")
const { connectDB } = require("./config/db")
const reviewRoute = require("./routes/reviewRoute")
const userAuthRoute = require("./routes/auth/userAuthRoute")
const companyAuthRoute = require("./routes/auth/companyAuthRoute")
const AuthController = require("./controllers/authController")
const userRoute = require("./routes/userRoute")
const companyRoute = require("./routes/companyRoute")
const tokenRoute = require("./routes/tokensRoute")

const app = express()
app.use(express.json())

connectDB()

app.get("/", (req, res) => {
    res.send("server running")
})

/*
 All routes
    auth:
    /api/auth/user/register (post)
    /api/auth/company/register (post)
    /api/auth/login (post)
    /api/auth/refresh (post)

    company:
    /api/auth/companies/:id (patch)
    /api/auth/companies/:id/send-review-request (post) send email to customer

    user: 
    /api/auth/users/:id (patch)

    token: * no need to store token in database, remember to delete token table and token model and update token controller
    /api/verify-token/:token (post) verify token from url

    reviews:
    /api/reviews (get) all reviews
    /api/reviews/:type (get) all reviews of type user or customer
    /api/reviews/:type (post) create review of type user or customer
    /api/reviews/:type/:id (get)
    /api/reviews/:type/:id (patch)
    /api/reviews/:type/:id (delete)
*/

//auth routes
app.use("/api/auth/user", userAuthRoute)
app.use("/api/auth/company", companyAuthRoute)
app.post("/api/auth/refresh", AuthController.refreshAccessToken)
app.post("/api/auth/login", AuthController.login)

// other routes
app.use("/api/users", userRoute)
app.use("/api/companies", companyRoute)
app.use("/api/verify-token", tokenRoute)

//review route
app.use("/api/reviews", reviewRoute)


const port = 3000
app.listen(process.env.PORT || port, () => {
    console.log(`server running on port ${port || process.env.PORT}`)
})