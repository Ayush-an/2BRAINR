// src/controllers/superadmin.controller.js
import bcrypt from "bcrypt";
import { User, Organization } from "../models/index.js";
import { logger } from "../config/logger.js";

/* -------------------------------------------
   ✅ Create initial SuperAdmin (for seeding)
-------------------------------------------- */
export const createSuperAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const superAdmin = await User.create({
  full_name: fullName,   // ✅ match DB
  email,
  password: hashedPassword,
  role: "SuperAdmin",
  approved: true,
});

    logger.info(`SuperAdmin created: ${email}`);
    return res.status(201).json({ message: "SuperAdmin created", superAdmin });
  } catch (err) {
    logger.error(`Create SuperAdmin error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

/* -------------------------------------------
   ✅ Approve another SuperAdmin registration
-------------------------------------------- */
export const approveSuperAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user || user.role !== "SuperAdmin")
      return res.status(404).json({ message: "SuperAdmin not found" });

    user.approved = true;
    await user.save();

    logger.info(`SuperAdmin approved: ${user.email}`);
    return res.status(200).json({ message: "SuperAdmin approved successfully" });
  } catch (err) {
    logger.error(`Approval error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/* -------------------------------------------
   ✅ Create Admin under an Organization
-------------------------------------------- */
// -------------------------
// Create Admin under Organization
// -------------------------
export const createAdmin = async (req, res) => {
  try {
    const {
      orgName,
      orgEmail,
      country,
      state,
      phone,
      address,
      adminName,
      adminEmail,
      adminMobile,
      adminPassword,
    } = req.body;

    // Validate required fields
    if (!orgName || !orgEmail || !adminName || !adminEmail || !adminPassword) {
      return res.status(400).json({ message: "Organization & Admin required fields missing" });
    }

    // Ensure logged-in SuperAdmin ID is available
    const createdBy = req.user?.id; // Assuming you set req.user after authentication
    if (!createdBy) {
      return res.status(403).json({ message: "Unauthorized: SuperAdmin ID missing" });
    }

    // Create Organization
    const org = await Organization.create({
      name: orgName,
      email: orgEmail,
      country: country || null,
      state: state || null,
      phone: phone || null,
      address: address || null,
      created_by: createdBy,
    });

    // Hash admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create Admin user
    const admin = await User.create({
      full_name: adminName,       // ✅ must match DB column
      email: adminEmail,
      mobile: adminMobile || null,
      password: hashedPassword,
      role: "Admin",
      organizationId: org.id,
      approved: true,
    });

    logger.info(`Admin created under ${orgName}: ${adminEmail}`);
    return res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    logger.error(`Create Admin error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
/* -------------------------------------------
   ✅ Get all SuperAdmins
-------------------------------------------- */
export const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await User.findAll({
      where: { role: "SuperAdmin" },
      attributes: ["id", "name", "email", "approved", "createdAt"], // use 'name' not 'fullName'
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "SuperAdmins fetched successfully",
      superAdmins,
    });
  } catch (err) {
    logger.error(`Fetch SuperAdmins error: ${err.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
