const express = require("express");
const router = express.Router();

const leaveController = require("../controllers/leaveController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, leaveController.applyLeave);
router.get("/my", authMiddleware, leaveController.getMyLeaves);
router.get("/", authMiddleware, adminMiddleware, leaveController.getAllLeaves);
router.put("/:id/approve", authMiddleware, adminMiddleware, leaveController.approveLeave);
router.put("/:id/reject", authMiddleware, adminMiddleware, leaveController.rejectLeave);


module.exports = router;