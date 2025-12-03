// src/routes/auth.routes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

export default router;