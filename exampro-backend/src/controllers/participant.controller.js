import bcrypt from "bcryptjs";


import { Participant, Organization } from "../models/index.js";

/**
 * 🧾 Register a new Participant
 */
export const registerParticipant = async (req, res, next) => {
  try {
    const { name, email, mobile, organizationId, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const participant = await Participant.create({
      name,
      email,
      mobile,
      organizationId,
      password: hashed,
      role: "Participant",
      dateOfJoin: new Date(),
    });

    res.status(201).json({
      message: "Participant registered successfully",
      participant,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * 👤 Get participant profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const participant = await Participant.findByPk(req.user.id, {
      include: [Organization],
    });

    if (!participant)
      return res.status(404).json({ message: "Participant not found" });

    res.json(participant);
  } catch (err) {
    next(err);
  }
};

/**
 * 📅 (Optional) Get upcoming exams
 */
export const getUpcomingExams = async (req, res, next) => {
  try {
    // Just a placeholder implementation for now
    res.json({ message: "Upcoming exams feature not implemented yet." });
  } catch (err) {
    next(err);
  }
};
