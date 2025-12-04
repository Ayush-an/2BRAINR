// src/controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  Admin,
  SuperUser,
  SuperAdmin,
  Participant,
  Organization
} from "../models/index.js";

const MODELS = {
  Admin,
  SuperUser,
  SuperAdmin,
  Participant
};

export const registerUser = async (req, res) => {
try {
const { name, email, password, role, organizationId, adminId } = req.body;

if (!MODELS[role]) {
  return res.status(400).json({ message: "Invalid role for registration." });
}

const model = MODELS[role];

const existing = await model.findOne({ where: { email } });
if (existing) {
  return res.status(400).json({ message: "Email already registered." });
}

if (role !== "SuperAdmin") {
  const org = await Organization.findByPk(organizationId);
  if (!org) {
    return res.status(400).json({ message: "Invalid organizationId." });
  }
}

if (role === "SuperUser") {
  const admin = await Admin.findByPk(adminId);
  if (!admin) {
    return res.status(400).json({ message: "Invalid adminId." });
  }
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await model.create({
  name,
  email,
  password: hashedPassword,
  organizationId: role === "SuperAdmin" ? null : organizationId,
  adminId: role === "SuperUser" ? adminId : null,
});

res.status(201).json({
  success: true,
  message: `${role} registered successfully`,
  user,
});

} catch (err) {
res.status(500).json({
success: false,
message: err.message,
stack: err.stack,
});
}
};

// LOGIN
// src/controllers/auth.controller.js
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Automatically detect role based on email
    const user =
      (await Admin.findOne({ where: { email } })) ||
      (await SuperAdmin.findOne({ where: { email } })) ||
      (await SuperUser.findOne({ where: { email } })) ||
      (await Participant.findOne({ where: { email } }));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Include organizationId in token for Admins and SuperUsers
    const payload = {
      id: user.id,
      role: user.role,
      organizationId:
        user.role === "Admin" || user.role === "SuperUser"
          ? user.organizationId
          : null,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: payload.organizationId, // return it to frontend too
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
