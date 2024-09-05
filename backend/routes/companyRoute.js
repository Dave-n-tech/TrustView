const express = require("express");
const router = express.Router();
const {updateCompany} = require("../controllers/companyController")
const authorizeRoles = require("../middleware/authMiddleware")

router.patch("/:id", authorizeRoles(["company"]), updateCompany);

module.exports = router;