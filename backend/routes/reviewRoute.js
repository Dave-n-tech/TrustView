const express = require("express")
const router = express.Router()
const ReviewController = require("../controllers/reviewController")
const authorizeRoles = require("../middleware/authMiddleware")

// route for both customer and user reviews
router.get("/", ReviewController.getAllReviews)
router.get("/users/:id", ReviewController.getReviewsByUserId)
router.get("/company/:id", ReviewController.getUserReviewsByCompanyId)
router.get("/company/:id/all", ReviewController.getAllCompanyReviewsByCompanyId)

// dynamic routes for handling reviews based on type
router.get("/:type", ReviewController.getAllReviewsByType)
router.post("/:type", authorizeRoles(["user", "customer"]), ReviewController.createReview)
router.get("/:type/:id", ReviewController.getReviewById)
router.patch("/:type/:id", authorizeRoles(["user", "company"]), ReviewController.updateReview)
router.delete("/:type/:id", authorizeRoles(["user"]), ReviewController.deleteReview)


module.exports = router