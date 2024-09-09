const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/userController");
const authorizeRoles = require("../middleware/authMiddleware");

router.patch("/:id", authorizeRoles(["user"]), updateUser);

module.exports = router;
