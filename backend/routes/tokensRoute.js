const express = require("express");
const router = express.Router();
const TokenController = require("../controllers/tokenController")

router.post("/", TokenController.verifyToken)

module.exports = router