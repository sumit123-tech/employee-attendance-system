const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Employee
router.post("/", authMiddleware, expenseController.createExpense);

router.get("/my-expenses", authMiddleware, expenseController.getMyExpenses);

// Admin
router.get("/", authMiddleware, adminMiddleware, expenseController.getAllExpenses);

router.put(
  "/:id/approve",
  authMiddleware,
  adminMiddleware,
  expenseController.approveExpense
);

router.put(
  "/:id/reject",
  authMiddleware,
  adminMiddleware,
  expenseController.rejectExpense
);

module.exports = router;