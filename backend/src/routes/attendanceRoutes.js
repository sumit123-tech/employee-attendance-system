const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/check-in", authMiddleware, attendanceController.checkIn);

router.post("/check-out", authMiddleware, attendanceController.checkOut);

router.get("/my-attendance", authMiddleware, attendanceController.getMyAttendance);

// Admin only
router.get("/", authMiddleware, adminMiddleware, attendanceController.getAllAttendance);

module.exports = router;