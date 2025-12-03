// src/routes/index.js

import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DB_NAME = process.env.DB_NAME || "exampro";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASSWORD || "9657602184ayush";
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_DIALECT = process.env.DB_DIALECT || "mysql";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

const db = { sequelize, Sequelize, DataTypes };

// load models
import userModel from "../models/user.model.js";
import organizationModel from "../models/organization.model.js";
import groupModel from "../models/group.model";
import participantGroupModel from "../models/participantGroup.model.js";
import examModel from "../models/exam.model.js";
import questionModel from "../models/question.model.js";
import examQuestionModel from "../models/examQuestion.model.js";
import activityModel from "../models/activity.model.js";
import auditLogModel from "../models/auditLog.model.js";

// role wrappers (they return the same User model instance)
import superAdminModel from "../models/superAdmin.model.js";
import adminModel from "../models/admin.model.js";
import superUserModel from "../models/superUser.model.js";
import participantModel from "../models/participant.model.js";

// initialize core models
db.User = userModel(sequelize, DataTypes);
db.Organization = organizationModel(sequelize, DataTypes);
db.Group = groupModel(sequelize, DataTypes);
db.ParticipantGroup = participantGroupModel(sequelize, DataTypes);
db.Exam = examModel(sequelize, DataTypes);
db.Question = questionModel(sequelize, DataTypes);
db.ExamQuestion = examQuestionModel(sequelize, DataTypes);
db.Activity = activityModel(sequelize, DataTypes);
db.AuditLog = auditLogModel(sequelize, DataTypes);

// initialize role "aliases" (they simply return the User model to keep single table)
db.SuperAdmin = superAdminModel(sequelize, DataTypes);
db.Admin = adminModel(sequelize, DataTypes);
db.SuperUser = superUserModel(sequelize, DataTypes);
db.Participant = participantModel(sequelize, DataTypes);

// Associations

// Organization <-> Users
db.Organization.hasMany(db.User, { foreignKey: "organization_id", as: "users" });
db.User.belongsTo(db.Organization, { foreignKey: "organization_id", as: "organization" });

// Group <-> Organization
db.Organization.hasMany(db.Group, { foreignKey: "organization_id", as: "groups" });
db.Group.belongsTo(db.Organization, { foreignKey: "organization_id", as: "organization" });

// Group <-> Participant (many-to-many) via participant_groups
db.Group.belongsToMany(db.User, {
  through: db.ParticipantGroup,
  foreignKey: "group_id",
  otherKey: "participant_id",
  as: "participants",
});
db.User.belongsToMany(db.Group, {
  through: db.ParticipantGroup,
  foreignKey: "participant_id",
  otherKey: "group_id",
  as: "groups",
});

// Exam <-> Group
db.Group.hasMany(db.Exam, { foreignKey: "group_id", as: "exams" });
db.Exam.belongsTo(db.Group, { foreignKey: "group_id", as: "group" });

// Exam <-> Organization
db.Organization.hasMany(db.Exam, { foreignKey: "organization_id", as: "exams" });
db.Exam.belongsTo(db.Organization, { foreignKey: "organization_id", as: "organization" });

// Exam <-> Question via exam_questions table
db.Exam.belongsToMany(db.Question, {
  through: db.ExamQuestion,
  foreignKey: "exam_id",
  otherKey: "question_id",
  as: "questions",
});
db.Question.belongsToMany(db.Exam, {
  through: db.ExamQuestion,
  foreignKey: "question_id",
  otherKey: "exam_id",
  as: "exams",
});

// Questions created by admin/superuser (admin_id)
db.User.hasMany(db.Question, { foreignKey: "admin_id", as: "createdQuestions" });
db.Question.belongsTo(db.User, { foreignKey: "admin_id", as: "creator" });

// Activity <-> User
db.User.hasMany(db.Activity, { foreignKey: "user_id", as: "activities" });
db.Activity.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

// AuditLog <-> User (changed_by)
db.User.hasMany(db.AuditLog, { foreignKey: "changed_by", as: "audits" });
db.AuditLog.belongsTo(db.User, { foreignKey: "changed_by", as: "changer" });

export default db;