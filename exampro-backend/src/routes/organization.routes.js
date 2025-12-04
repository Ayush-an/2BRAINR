import express from "express";
import {
  createOrganization,
  getOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  getOrganizationStats
} from "../controllers/organization.controller.js";

import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

// Stats must be BEFORE :id route
router.get(
  "/stats",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  getOrganizationStats
);

router.post(
  "/",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN),
  createOrganization
);

router.get(
  "/",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  getOrganizations
);

router.get(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.SUPER_USER),
  getOrganizationById
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN),
  updateOrganization
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.SUPER_ADMIN),
  deleteOrganization
);

export default router;
