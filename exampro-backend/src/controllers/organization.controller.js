// src/controllers/organization.controller.js
import { Organization, Admin, SuperUser, User  } from "../models/index.js";

/**
 * 🧩 Create Organization
 */
export const createOrganization = async (req, res, next) => {
  try {
    const { name, email, country, state, phone, address, created_by } = req.body;

    const org = await Organization.create({
      name,
      email,
      country,
      state,
      phone,
      address,
      created_by,
    });

    res.status(201).json({ message: "Organization created successfully", org });
  } catch (err) {
    next(err);
  }
};

/**
 * 📋 Get all organizations
 */
export const getOrganizations = async (req, res, next) => {
  try {
    const orgs = await Organization.findAll();
    res.json(orgs);
  } catch (err) {
    next(err);
  }
};

/**
 * 🔍 Get organization by ID
 */
export const getOrganizationById = async (req, res, next) => {
  try {
    const org = await Organization.findByPk(req.params.id);
    if (!org) return res.status(404).json({ message: "Organization not found" });
    res.json(org);
  } catch (err) {
    next(err);
  }
};

/**
 * ✏️ Update organization
 */
export const updateOrganization = async (req, res, next) => {
  try {
    const org = await Organization.findByPk(req.params.id);
    if (!org) return res.status(404).json({ message: "Organization not found" });

    await org.update(req.body);
    res.json({ message: "Organization updated successfully", org });
  } catch (err) {
    next(err);
  }
};

/**
 * 🗑️ Delete organization
 */
export const deleteOrganization = async (req, res, next) => {
  try {
    const org = await Organization.findByPk(req.params.id);
    if (!org) return res.status(404).json({ message: "Organization not found" });

    await org.destroy();
    res.json({ message: "Organization deleted successfully" });
  } catch (err) {
    next(err);
  }
};


export const getOrganizationStats = async (req, res) => {
  console.log("🔥 /stats route HIT");
  try {
    // Fetch all organizations
    const orgs = await Organization.findAll({
      attributes: ["id", "name", "status"],
      raw: true,
    });

    // Fetch all admins, superusers, and participants
    const admins = await Admin.findAll({ raw: true });
    const superUsers = await SuperUser.findAll({ raw: true });
    const participants = await User.findAll({
      where: { role: "PARTICIPANT" },
      raw: true,
    });

    // Map organization stats
    const result = orgs.map((org) => {
      const orgAdmins = admins.filter((a) => a.organizationId === org.id).length;
      const orgSuperUsers = superUsers.filter((s) => s.organizationId === org.id).length;
      const orgParticipants = participants.filter((p) => p.organization_id === org.id).length;

      return {
        id: org.id,
        name: org.name,
        status: org.status || "Active", // fallback in case status missing
        adminCount: orgAdmins,
        superUserCount: orgSuperUsers,
        participantCount: orgParticipants,
        totalUsers: orgAdmins + orgSuperUsers + orgParticipants,
      };
    });

    return res.json({ organizations: result });
  } catch (err) {
    console.error("Error fetching organization stats:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

  