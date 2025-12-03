// src/routes/user.routes.js
import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ GET all users
router.get(
  "/all",
  verifyToken,
  authorizeRoles("SUPERADMIN", "ADMIN"),
  getAllUsers
);

export default router;