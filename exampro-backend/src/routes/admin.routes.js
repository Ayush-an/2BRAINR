// src/routes/admin.routes.js
import express from "express";
import { createAdmin, createSuperUser, createGroup, getGroups, uploadParticipantsController, getAdminStats, getAllAdmins, getAllSuperUsersByOrg } from "../controllers/admin.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Add this route for creating admin under organization
router.post("/create-admin", verifyToken, authorizeRoles("SuperAdmin"), createAdmin);

// Existing routes
router.post("/upload-participants", verifyToken, authorizeRoles("SuperUser"), upload.single("file"), uploadParticipantsController);
router.post("/create-superuser", verifyToken, authorizeRoles("Admin"), createSuperUser);
router.post("/create-group", verifyToken, authorizeRoles("Admin"), createGroup);
router.get("/groups", verifyToken, authorizeRoles("Admin"), getGroups);
router.get("/stats", verifyToken, authorizeRoles("Admin", "SuperUser", "SuperAdmin"), getAdminStats);
router.get("/all", verifyToken, authorizeRoles("Admin", "SuperUser", "SuperAdmin"), getAllAdmins);
router.get("/superusers", verifyToken, authorizeRoles("Admin", "SuperUser", "SuperAdmin"), getAllSuperUsersByOrg);

export default router;
