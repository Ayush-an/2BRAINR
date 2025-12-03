// src/controllers/organization.controller.js
import { Organization } from "../models/index.js";

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
