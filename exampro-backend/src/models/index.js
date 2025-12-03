// src/models/index.js
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

// Import all models
import UserModel from "./user.model.js";
import OrganizationModel from "./organization.model.js";
import GroupModel from "./group.model.js";
import ExamModel from "./exam.model.js";
import QuestionModel from "./question.model.js";
import ActivityModel from "./activity.model.js";
import AdminModel from "./admin.model.js";
import SuperUserModel from "./superUser.model.js";
import SuperAdminModel from "./superAdmin.model.js";
import ParticipantModel from "./participant.model.js";
import ParticipantGroupModel from "./participantGroup.model.js";

// Initialize models
const User = UserModel(sequelize, DataTypes);
const Organization = OrganizationModel(sequelize, DataTypes);
const Group = GroupModel(sequelize, DataTypes);
const Exam = ExamModel(sequelize, DataTypes);
const Question = QuestionModel(sequelize, DataTypes);
const Activity = ActivityModel(sequelize, DataTypes);
const Admin = AdminModel(sequelize, DataTypes);
const SuperUser = SuperUserModel(sequelize, DataTypes);
const SuperAdmin = SuperAdminModel;  // ✔ FIXED properly
const Participant = ParticipantModel(sequelize, DataTypes);
const ParticipantGroup = ParticipantGroupModel(sequelize, DataTypes);


// 🧩 Associations

// Organization ↔ User (covers Admin, SuperUser, etc.)
Organization.hasMany(User, { foreignKey: "organizationId" });
User.belongsTo(Organization, { foreignKey: "organizationId" });

// Organization ↔ Admin
Organization.hasMany(Admin, { foreignKey: "organizationId" });
Admin.belongsTo(Organization, { foreignKey: "organizationId" });

// Admin ↔ SuperUser
Admin.hasMany(SuperUser, { foreignKey: "adminId" });
SuperUser.belongsTo(Admin, { foreignKey: "adminId" });

// User ↔ Group (Created By)
User.hasMany(Group, { foreignKey: "createdBy" });
Group.belongsTo(User, { foreignKey: "createdBy" });

// Groups ↔ Participants (Many-to-Many)
Group.belongsToMany(Participant, {
  through: ParticipantGroup,
  foreignKey: "group_id",
  otherKey: "participant_id",
});
Participant.belongsToMany(Group, {
  through: ParticipantGroup,
  foreignKey: "participant_id",
  otherKey: "group_id",
});

// Group ↔ Exam
Group.hasMany(Exam, { foreignKey: "groupId" });
Exam.belongsTo(Group, { foreignKey: "groupId" });

// Exam ↔ Question
Exam.hasMany(Question, { foreignKey: "examId" });
Question.belongsTo(Exam, { foreignKey: "examId" });

// Organization ↔ Participant
Organization.hasMany(Participant, { foreignKey: "organizationId" });
Participant.belongsTo(Organization, { foreignKey: "organizationId" });

// User ↔ Activity
User.hasMany(Activity, { foreignKey: "userId" });
Activity.belongsTo(User, { foreignKey: "userId" });

// ✅ Export all models
export {
  sequelize,
  User,
  Organization,
  Group,
  Exam,
  Question,
  Activity,
  Admin,
  SuperUser,
  SuperAdmin,
  Participant,
  ParticipantGroup,
};
