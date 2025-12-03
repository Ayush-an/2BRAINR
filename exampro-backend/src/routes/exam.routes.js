// src/routes/exam.routes.js
import express from "express";
import {
  createExam, getExams, getExamById, updateExam, deleteExam, getRemovedExams, exportExamSummaryToExcel,
} from "../controllers/exam.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// Create a new exam
router.post(
  "/",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER),
  createExam
);

// Get all exams
router.get(
  "/",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  getExams
);

// Get single exam
router.get(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER, ROLES.PARTICIPANT),
  getExamById
);

// Update exam
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER),
  updateExam
);

// Soft delete exam
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER),
  deleteExam
);

// Get removed exams
router.get(
  "/removed/list",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.SUPER_ADMIN),
  getRemovedExams
);

// Export exam summary
router.get(
  "/export/excel",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.SUPER_ADMIN),
  exportExamSummaryToExcel
);

export default router;