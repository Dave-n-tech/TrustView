const express = require("express")
const router = express.Router()
const AuthController = require("../../controllers/authController")

router.post("/register", AuthController.registerCompany)

module.exports = router