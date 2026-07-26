const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, employeeController.getAllEmployees);
router.get("/:id", authMiddleware, employeeController.getEmployeeById);
router.post("/", authMiddleware, employeeController.createEmployee);
router.put("/:id", authMiddleware, employeeController.updateEmployee);
router.delete("/:id", authMiddleware, employeeController.deleteEmployee);

router.post("/", authMiddleware, adminMiddleware, employeeController.createEmployee);
router.get("/", authMiddleware, adminMiddleware, employeeController.getAllEmployees);
router.get("/:id", authMiddleware, adminMiddleware, employeeController.getEmployeeById);
router.put("/:id", authMiddleware, adminMiddleware, employeeController.updateEmployee);
router.delete("/:id", authMiddleware, adminMiddleware, employeeController.deleteEmployee);

module.exports = router;