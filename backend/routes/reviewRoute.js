const express = require("express")
const router = express.Router()
const ReviewController = require("../controllers/reviewController")
const authorizeRoles = require("../middleware/authMiddleware")
const { getSentimentScore } = require("../utils/getSentimentScore")

// route for both customer and user reviews
router.get("/", ReviewController.getAllReviews)

// dynamic routes for handling reviews based on type
router.get("/:type", ReviewController.getAllReviewsByType)
router.post("/:type", authorizeRoles(["user"]), ReviewController.createReview)
router.get("/:type/:id", ReviewController.getReviewById)
router.patch("/:type/:id", authorizeRoles(["user"]), ReviewController.updateReview)
router.delete("/:type/:id", authorizeRoles(["user"]), ReviewController.deleteReview)

//get review sentiment score
router.get("/sentiment", async (req, res) => {
    const review = req.body.review

    try {
        const sentiment = await getSentimentScore(review)
        res.json(sentiment)
    } catch (error) {
        res.status(500).json({message: "Error getting sentiment result from gemini", error: error})
    }
})


module.exports = router