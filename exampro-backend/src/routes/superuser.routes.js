// src/routes/superuser.routes.js
import express from "express";
import { createExam } from "../controllers/exam.controller.js";
import {
  uploadParticipantsController,
  getAllParticipants,
} from "../controllers/superuser.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// ✅ Upload participants
router.post(
  "/upload-participants",
  verifyToken,
  authorizeRoles("SuperUser"),
  upload.single("file"),
  uploadParticipantsController
);

// ✅ Create exam
router.post(
  "/create-exam",
  verifyToken,
  authorizeRoles("SuperUser"),
  createExam
);

// ✅ Get all participants
router.get(
  "/participants",
  verifyToken,
  authorizeRoles("SuperUser"),
  getAllParticipants
);


export default router;