// src/services/user.service.js
const bcrypt = require("bcryptjs");
const { SuperAdmin } = require("../models/superAdmin.model");
const { Admin } = require("../models/admin.model");
const { SuperUser } = require("../models/superUser.model");
const { Participant } = require("../models/participant.model");

exports.createSuperAdmin = async (data) => {
  const { name, email, mobile, password } = data;
  const hashed = await bcrypt.hash(password, 10);
  return SuperAdmin.create({
    name,
    email,
    mobile,
    password: hashed,
    status: "Pending",
    role: "SuperAdmin",
    dateOfJoin: new Date(),
  });
};

exports.approveSuperAdmin = async (id) => {
  const superAdmin = await SuperAdmin.findByPk(id);
  if (!superAdmin) throw new Error("SuperAdmin not found");
  superAdmin.status = "Approved";
  await superAdmin.save();
  return superAdmin;
};

exports.createAdmin = async (data, orgId) => {
  const { name, email, mobile, password } = data;
  const hashed = await bcrypt.hash(password, 10);
  return Admin.create({
    name,
    email,
    mobile,
    password: hashed,
    organizationId: orgId,
    role: "Admin",
    dateOfJoin: new Date(),
  });
};

exports.createSuperUser = async (data, adminId) => {
  const { name, email, mobile, password } = data;
  const hashed = await bcrypt.hash(password, 10);
  return SuperUser.create({
    name,
    email,
    mobile,
    password: hashed,
    adminId,
    role: "SuperUser",
    dateOfJoin: new Date(),
  });
};

exports.createParticipant = async (data, organizationId) => {
  const { name, email, mobile, password } = data;
  const hashed = await bcrypt.hash(password, 10);
  return Participant.create({
    name,
    email,
    mobile,
    password: hashed,
    organizationId,
    role: "Participant",
    dateOfJoin: new Date(),
  });
};

exports.getUserByEmail = async (role, email) => {
  const models = { SuperAdmin, Admin, SuperUser, Participant };
  const Model = models[role];
  if (!Model) throw new Error("Invalid role");
  return Model.findOne({ where: { email } });
};
