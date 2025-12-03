// src/routes/organization.routes.js
import express from "express";
import {
  createOrganization, getOrganizations, getOrganizationById, updateOrganization, deleteOrganization,
} from "../controllers/organization.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// 🏢 Create new organization (SuperAdmin only)
router.post(
  "/",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN),
  createOrganization
);

// 📋 Get all organizations
router.get(
  "/",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  getOrganizations
);

// 🔍 Get organization by ID
router.get(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  getOrganizationById
);

// ✏️ Update organization
router.put(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN),
  updateOrganization
);

// 🗑️ Delete organization
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN),
  deleteOrganization
);

export default router;