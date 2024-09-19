const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/userController");
const authorizeRoles = require("../middleware/authMiddleware");

router.get("/:id", getUser)
router.patch("/:id", authorizeRoles(["user"]), updateUser);

module.exports = router;
