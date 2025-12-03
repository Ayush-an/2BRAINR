// src/routes/group.routes.js
import express from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addParticipantsToGroup,
  removeParticipantFromGroup,
  getRemovedGroups,
  getUploadedBatches
} from "../controllers/group.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER),
  createGroup
);

router.get(
  "/",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.SUPER_ADMIN),
  getGroups
);

router.get(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.SUPER_ADMIN),
  getGroupById
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER),
  updateGroup
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER),
  deleteGroup
);

router.post(
  "/:groupId/participants",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER),
  addParticipantsToGroup
);

router.delete(
  "/:groupId/participants/:participantId",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER),
  removeParticipantFromGroup
);


// Removed groups
router.get(
  "/removed",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.SUPER_ADMIN),
  getRemovedGroups
);

// Uploaded batches
router.get(
  "/batches",
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPER_USER, ROLES.SUPER_ADMIN),
  getUploadedBatches
);

export default router;