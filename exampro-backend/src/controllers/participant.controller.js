// src/controllers/participant.controller.js
import bcrypt from "bcryptjs";
import { Participant, Organization, Group } from "../models/index.js";
export const registerParticipant = async (req, res, next) => {
  try {
    const { name, email, mobile, groupId } = req.body;
    // Get group → organization
    const group = await Group.findByPk(groupId);
    if (!group) return res.status(400).json({ message: "Group not found" });
    // Auto-generate password
    const password = Math.floor(100000 + Math.random() * 900000).toString();
    const hash = await bcrypt.hash(password, 10);
    const participant = await Participant.create({
      name,
      email,
      mobile,
      groupId,
      organizationId: group.organizationId,
      password: hash,
      status: "Active",
    });
    res.status(201).json({
      message: "Participant created successfully",
      generatedPassword: password,
      participant,
    });
  } catch (err) {
    next(err);
  }
};

/** Get participant profile */
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

export const participantLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const participant = await Participant.findOne({ where: { email } });
    if (!participant) return res.status(404).json({ message: "Not found" });
    participant.loginTime = new Date();
    participant.status = "Active";
    await participant.save();
    res.json({ message: "Login updated" });
  } catch (err) {
    next(err);
  }
};
export const participantLogout = async (req, res, next) => {
  try {
    const participant = await Participant.findByPk(req.user.id);
    const logoutTime = new Date();
    const spend =
      participant.loginTime ? Math.floor((logoutTime - participant.loginTime) / 1000) : 0;
    participant.logoutTime = logoutTime;
    participant.spendTime = spend;
    participant.status = "Inactive";
    await participant.save();
    res.json({ message: "Logout saved", spend });
  } catch (err) {
    next(err);
  }
};
export const getParticipantsOfOrg = async (req, res, next) => {
  try {
    const userOrg = req.user.organizationId;
    const list = await Participant.findAll({
      where: { organizationId: userOrg },
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const getGroups = async (req, res) => {
  try {
    const { organizationId } = req.query;

    if (!organizationId) {
      return res.status(400).json({ message: "organizationId required" });
    }
    const groups = await Group.findAll({
      where: { organizationId },
      order: [["updated_at", "DESC"]],
    });
    res.json({ groups });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};