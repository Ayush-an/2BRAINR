// src/models/participant.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export default (sequelize, DataTypes) => {
  const Participant = sequelize.define("Participant", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("Participant"),
      defaultValue: "Participant",
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Inactive"),
      defaultValue: "Approved",
    },
    dateOfJoin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Participant;
};
