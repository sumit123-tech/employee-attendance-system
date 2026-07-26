const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/departmentController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, departmentController.createDepartment);
router.get("/", authMiddleware, departmentController.getAllDepartments);
router.get("/:id", authMiddleware, departmentController.getDepartmentById);
router.put("/:id", authMiddleware, departmentController.updateDepartment);
router.delete("/:id", authMiddleware, departmentController.deleteDepartment);

router.get("/", authMiddleware, adminMiddleware, departmentController.getAllDepartments);
router.get("/:id", authMiddleware, adminMiddleware, departmentController.getDepartmentById);
router.post("/", authMiddleware, adminMiddleware, departmentController.createDepartment);
router.put("/:id", authMiddleware, adminMiddleware, departmentController.updateDepartment);
router.delete("/:id", authMiddleware, adminMiddleware, departmentController.deleteDepartment);

module.exports = router;