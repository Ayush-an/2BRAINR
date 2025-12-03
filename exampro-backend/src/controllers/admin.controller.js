// src/controllers/admin.controller.js
import bcrypt from "bcryptjs";
import xlsx from "xlsx";
import { Organization, Admin, SuperUser, Group, Participant, User } from "../models/index.js";
/* -------------------------------------------
   ✅ Create Admin + Organization
-------------------------------------------- */
export const createAdmin = async (req, res, next) => {
  try {
    const {
      organizationName,
      organizationEmail,
      country,
      state,
      phone,
      address,
      adminName,
      adminEmail,
      mobile,
      password,
    } = req.body;

    if (!organizationName || !organizationEmail || !adminName || !adminEmail || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const org = await Organization.create({
      name: organizationName,
      email: organizationEmail,
      country,
      state,
      phone,
      address,
    });

    const admin = await Admin.create({
      name: adminName,
      email: adminEmail,
      mobile,
      password: hashedPassword,
      organizationId: org.id,
      role: "Admin",
      dateOfJoin: new Date(),
    });

    res.status(201).json({
      message: "Admin & Organization created successfully",
      admin,
      organization: org,
    });
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------
   ✅ Create SuperUser (under an Admin)
-------------------------------------------- */
export const createSuperUser = async (req, res, next) => {
  try {
    const { name, email, password, adminId } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const superUser = await SuperUser.create({
      name,
      email,
      password: hashed,
      role: "SuperUser",
      adminId,
      dateOfJoin: new Date(),
    });

    res.status(201).json({ message: "SuperUser created successfully", superUser });
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------
   ✅ Create Group (Admin-level)
-------------------------------------------- */
export const createGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const group = await Group.create({ name, description });
    res.status(201).json({ message: "Group created successfully", group });
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------
   ✅ Get All Groups
-------------------------------------------- */
export const getGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll();
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------
   ✅ Get basic stats (Admins & Orgs)
-------------------------------------------- */
export const getAdminStats = async (req, res, next) => {
  try {
    const totalAdmins = await Admin.count();
    const totalOrganizations = await Organization.count();
    res.json({ totalAdmins, totalOrganizations });
  } catch (err) {
    next(err);
  }
};

/* -------------------------------------------
   ✅ Upload Participants from Excel/CSV
-------------------------------------------- */
export const uploadParticipantsController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read uploaded Excel/CSV file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data.length) {
      return res.status(400).json({ message: "Uploaded file is empty" });
    }

    const participants = [];

    for (const row of data) {
      const { name, email, mobile, password } = row;
      if (!name || !email || !password) continue;

      const hashedPassword = await bcrypt.hash(password, 10);

      participants.push({
        name,
        email,
        mobile: mobile || null,
        password: hashedPassword,
        organizationId: req.user.organizationId || null,
      });
    }

    await Participant.bulkCreate(participants, { ignoreDuplicates: true });

    res.status(201).json({
      message: `${participants.length} participants uploaded successfully.`,
      count: participants.length,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ message: "Failed to upload participants", error: error.message });
  }
};


/* -------------------------------------------
   ✅ Get All Admins
-------------------------------------------- */
export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.findAll({
      include: [
        {
          model: Organization,
          attributes: ["name"],
        }
      ]
    });

    res.json(
      admins.map((a) => ({
        id: a.id,
        name: a.name,
        email: a.email,
        organizationName: a.Organization?.name || null
      }))
    );
  } catch (err) {
    next(err);
  }
};

export const getAllSuperUsersByOrg = async (req, res) => {
  try {
    const { organizationId } = req.query;

    let whereClause = { role: "SUPERUSER" };
    if (organizationId) whereClause.organization_id = organizationId;

    const superUsers = await User.findAll({ where: whereClause });

    return res.status(200).json({ superUsers });
  } catch (err) {
    console.error("Error fetching superusers:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};