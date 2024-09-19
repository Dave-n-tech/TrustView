const express = require("express")
const router = express.Router()
const ReviewController = require("../controllers/reviewController")
const authorizeRoles = require("../middleware/authMiddleware")

// route for both customer and user reviews
router.get("/", ReviewController.getAllReviews)

// dynamic routes for handling reviews based on type
router.get("/:type", ReviewController.getAllReviewsByType)
router.post("/:type", authorizeRoles(["user"]), ReviewController.createReview)
router.get("/:type/:id", ReviewController.getReviewById)
router.patch("/:type/:id", authorizeRoles(["user"]), ReviewController.updateReview)
router.delete("/:type/:id", authorizeRoles(["user"]), ReviewController.deleteReview)

module.exports = router