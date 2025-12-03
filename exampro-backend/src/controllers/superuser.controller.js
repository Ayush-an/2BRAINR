// src/controllers/superuser.controller.js
import XLSX from "xlsx";
import bcrypt from "bcryptjs";
import { Participant, SuperUser } from "../models/index.js";

// ✅ Upload & create participants from Excel/CSV
export const uploadParticipantsController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const createdParticipants = [];

    for (const record of data) {
      if (!record.email || !record.name || !record.password) continue;

      const hashedPassword = await bcrypt.hash(record.password, 10);

      const participant = await Participant.create({
        name: record.name,
        email: record.email,
        mobile: record.mobile || null,
        password: hashedPassword,
        role: "Participant",
        status: "Approved",
      });

      createdParticipants.push(participant);
    }

    res.status(201).json({
      message: "Participants uploaded successfully",
      total: createdParticipants.length,
      participants: createdParticipants,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get all superusers or filter by organization
export const getSuperUsersController = async (req, res, next) => {
  try {
    const { organizationId } = req.query;

    let superusers;
    if (organizationId) {
      // Fetch superusers for a specific organization
      superusers = await SuperUser.findAll({
        where: { organizationId },
      });
    } else {
      // Fetch all superusers
      superusers = await SuperUser.findAll();
    }

    res.status(200).json({
      message: "SuperUsers fetched successfully",
      superusers,
    });
  } catch (err) {
    next(err);
  }
};

import { User } from "../models/index.js";

/**
 * Get all Participants
 * GET /api/superuser/participants
 */
export const getAllParticipants = async (req, res) => {
  try {
    const participants = await User.findAll({ where: { role: "PARTICIPANT" } });
    return res.status(200).json({ participants });
  } catch (err) {
    console.error("Error fetching participants:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
