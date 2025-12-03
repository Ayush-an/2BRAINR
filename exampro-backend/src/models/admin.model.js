// src/models/admin.model.js
export default (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
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
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Admin",
    },
    dateOfJoin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Organizations",
        key: "id",
      },
    },
  });

  return Admin;
};
