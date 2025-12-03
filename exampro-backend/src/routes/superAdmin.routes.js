// src/routes/superAdmin.routes.js
import express from "express";
import {
  createSuperAdmin,
  approveSuperAdmin,
  createAdmin,
  getAllSuperAdmins,
} from "../controllers/superadmin.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create first SuperAdmin (no token required)
router.post("/create", createSuperAdmin);

// Approve a SuperAdmin
router.post(
  "/approve",
  verifyToken,
  authorizeRoles("SuperAdmin"),
  approveSuperAdmin
);

// Create Admin under organization
router.post(
  "/create-admin",
  verifyToken,
  authorizeRoles("SuperAdmin"),
  createAdmin
);

// ✅ Get all SuperAdmins
router.get(
  "/all",
  verifyToken,
  authorizeRoles("SuperAdmin"),
  getAllSuperAdmins
);
export default router;