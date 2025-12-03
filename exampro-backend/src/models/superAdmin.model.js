// src/models/superAdmin.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


export const SuperAdmin = sequelize.define("SuperAdmin", {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("SuperAdmin"),
    defaultValue: "SuperAdmin",
  },
  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    defaultValue: "Active",
  },
  dateOfJoin: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default SuperAdmin;
