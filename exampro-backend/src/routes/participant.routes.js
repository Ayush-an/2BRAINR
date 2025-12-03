import express from "express";
import { registerParticipant, getProfile, getUpcomingExams } from "../controllers/participant.controller.js";

import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * 🧾 Register new participant
 * Accessible by SuperUser or Admin
 */
router.post(
  "/register",
  verifyToken,
  authorizeRoles("SuperUser", "Admin"),
  registerParticipant
);

/**
 * 👤 Get logged-in participant’s profile
 */
router.get(
  "/profile",
  verifyToken,
  authorizeRoles("Participant"),
  getProfile
);

/**
 * 📅 Get upcoming exams (optional)
 * If you added getUpcomingExams() in the controller, keep this route.
 */
router.get(
  "/upcoming-exams",
  verifyToken,
  authorizeRoles("Participant"),
  getUpcomingExams
);

export default router;