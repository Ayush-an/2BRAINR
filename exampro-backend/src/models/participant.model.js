// src/models/participant.model.js
export default (sequelize, DataTypes) => {
  const Participant = sequelize.define("Participant", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    organizationId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    role: { type: DataTypes.ENUM("Participant"), defaultValue: "Participant" },
    status: { type: DataTypes.ENUM("Active", "Inactive"), defaultValue: "Active" },
    dateOfJoin: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    loginTime: DataTypes.DATE,
    logoutTime: DataTypes.DATE,
    spendTime: DataTypes.INTEGER,
  });
  return Participant;
};
