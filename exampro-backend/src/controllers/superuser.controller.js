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

      const participant = await User.create({
  full_name: record.name,
  email: record.email,
  password: hashed,
  mobile: record.mobile,
  role: "PARTICIPANT",
  organization_id: req.user.organization_id,
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

export const getAllSuperUsers = async (req, res) => {
  const superUsers = await SuperUser.findAll({
    include: [
      {
        model: Admin,
        include: [Organization]  // allows getting organizationId
      }
    ]
  });

  res.json(
    superUsers.map(s => ({
      id: s.id,
      name: s.name,
      email: s.email,
      adminId: s.adminId,
      organizationId: s.Admin?.organizationId || null
    }))
  );
};

