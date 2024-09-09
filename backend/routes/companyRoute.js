const express = require("express");
const router = express.Router();
const { updateCompany, sendEmailToCustomer, getAllCompanies } = require("../controllers/companyController");
const authorizeRoles = require("../middleware/authMiddleware");

router.get("/", getAllCompanies)
router.patch("/:id", authorizeRoles(["company"]), updateCompany);
router.post("/:id/send-review-request", authorizeRoles(["company"]), sendEmailToCustomer)

module.exports = router;
