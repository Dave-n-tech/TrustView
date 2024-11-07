const userReview = require("../models/userReviewModel");
const customerReview = require("../models/customerReviewModel");

const ReviewController = {
  // get all reviews and join together
  async getAllReviews(req, res) {
    try {
      const userReviews = await userReview.getAll();
      const customerReviews = await customerReview.getAll();

      res.json([...userReviews, ...customerReviews]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching reviews", error: error.message });
    }
  },

  // get all reviews of a certain type
  async getAllReviewsByType(req, res) {
    const type = req.params.type;

    try {
      let reviews;

      if (type === "user") {
        reviews = await userReview.getAll();
      } else if (type === "customer") {
        reviews = await customerReview.getAll();
      } else {
        return res.status(400).json({ message: "Invalid review type" });
      }

      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: "Error fetching reviews", error: err });
    }
  },

  async getReviewById(req, res) {
    const { type, id } = req.params;

    try {
      let review;

      if (type === "user") {
        review = await userReview.getById(id);
      } else if (type === "customer") {
        review = await customerReview.getById(id);
      } else {
        return res.status(400).json({ message: "Invalid review type" });
      }

      if (review) {
        res.json(review);
      } else {
        res.status(404).json({ message: "Review not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching review", error: error });
    }
  },

  async getReviewsByUserId(req, res) {
    const id = req.params.id;

    try {
      const userReviews = await userReview.getByUserId(id);
      res.json(userReviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews", error: error });
    }
  },

  async getUserReviewsByCompanyId(req, res) {
    const id = req.params.id;

    try {
      const userReviews = await userReview.getByCompanyId(id);
      res.json(userReviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews", error: error });
    }
  },

  async getAllCompanyReviewsByCompanyId(req, res) {
    const id = req.params.id

    try {
      const userReviews = await userReview.getByCompanyId(id)
      const customerReviews = await customerReview.getByCompanyId(id)

      res.json([...userReviews, ...customerReviews])
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching reviews", error: error.message });
    }
  },

  async createReview(req, res) {
    const type = req.params.type;

    //extract values from req.body
    const reviewData = [];

    for (key in req.body) {
      reviewData.push(req.body[key]);
    }

    try {
      let reviewId;

      if (type === "user") {
        reviewId = await userReview.create(reviewData);
      } else if (type === "customer") {
        reviewId = await customerReview.create(reviewData);
      } else {
        return res.status(400).json({ message: "Invalid review type" });
      }

      res.status(201).json({ message: "Review created", reviewId });
    } catch (error) {
      res.status(500).json({ message: "Error creating review", error: error });
    }
  },

  async updateReview(req, res) {
    const { type, id } = req.params;
    const Keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const getColumns = require("../utils/getUpdateColumns");

    // get database columns to be updated
    const columns = getColumns(Keys);

    if (Keys.length === 0) {
      return res.status(400).json({ message: "No values provided for update" });
    }

    try {
      if (type === "user") {
        await userReview.update(id, values, columns);
      } else if (type === "customer") {
        await customerReview.update(id, values, columns);
      } else {
        return res.status(400).json({ message: "invalid review type" });
      }

      res.json({ message: "Review updated" });
    } catch (error) {
      res.status(500).json({ message: "Error updating review", error: error });
    }
  },

  async deleteReview(req, res) {
    const { type, id } = req.params;

    try {
      if (type === "user") {
        await userReview.deleteById(id);
      } else if (type === "customer") {
        await customerReview.deleteById(id);
      } else {
        return res.status(400).json({ message: "Invalid review type" });
      }

      res.json({ message: "Review deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting review", error: err });
    }
  },
};

module.exports = ReviewController;
