const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  dashboardController.getDashboard
);

router.get(
  "/employee",
  authMiddleware,
  dashboardController.getEmployeeDashboard
);

module.exports = router;