// src/routes/participant.routes.js
import express from "express";
import { registerParticipant, getProfile ,getParticipantsOfOrg,participantLogout,participantLogin} from "../controllers/participant.controller.js";
import { verifyToken, authorizeRoles } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/profile",verifyToken,authorizeRoles("Participant"),getProfile);
router.post("/register", verifyToken, authorizeRoles("SuperUser", "Admin"), registerParticipant);
router.get("/", verifyToken, authorizeRoles("SuperUser", "Admin"), getParticipantsOfOrg);
router.post("/login", participantLogin);
router.post("/logout", verifyToken, authorizeRoles("Participant"), participantLogout);

export default router;