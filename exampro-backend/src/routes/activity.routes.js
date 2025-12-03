// src/routes/activity.routes.js
import express from "express";
import { getActivityLog } from "../controllers/activity.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// 📜 Get activity logs (for admins / super users)
router.get(
  "/",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.SUPER_ADMIN),
  getActivityLog
);
export default router;