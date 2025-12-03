// src/routes/question.routes.js
import express from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// 🧩 Create question manually
router.post(
  "/",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  createQuestion
);

// 📤 Upload questions from Excel
router.post(
  "/upload",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  upload.single("file"),
  (req, res) => res.json({ message: "Excel upload endpoint placeholder" })
);

// 📋 Get all questions
router.get(
  "/",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  getQuestions
);

// 🔍 Get single question
router.get(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  getQuestionById
);

// ✏️ Update question
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  updateQuestion
);

// 🗑️ Delete question
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  deleteQuestion
);

export default router;