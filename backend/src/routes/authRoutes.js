const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", authMiddleware, (req, res) => {
  const { password, ...user } = req.user;

  res.json({
    success: true,
    user,
  });
});

module.exports = router;