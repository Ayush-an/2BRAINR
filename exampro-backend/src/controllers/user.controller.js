// src/controllers/user.controller.js
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import { logger } from "../config/logger.js";

// ✅ Create a new user
export const createUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      mobile,
      role,
      organization_id,
      approved,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
      mobile,
      role,
      organization_id: organization_id || null,
      approved: approved || false,
    });

    logger.info(`User created: ${email}`);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    logger.error(`Create User error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get all users (optionally filter by role or organization)
export const getAllUsers = async (req, res) => {
  try {
    const { role, organization_id } = req.query;

    let filter = {};
    if (role) filter.role = role.toUpperCase();
    if (organization_id) filter.organization_id = organization_id;

    const users = await User.findAll({
      where: filter,
      attributes: [
        "id",
        "full_name",
        "email",
        "mobile",
        "role",
        "organization_id",
        "approved",
        "status",
        "joined_at",
        "last_modified_at",
      ],
      order: [["joined_at", "DESC"]],
    });

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    logger.error(`Fetch Users error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    logger.error(`Fetch User error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update(updates);
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    logger.error(`Update User error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Delete user (soft delete by setting removed_at and status)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({ removed_at: new Date(), status: "REMOVED" });
    return res.status(200).json({ message: "User removed successfully" });
  } catch (err) {
    logger.error(`Delete User error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};