// src/models/user.model.js users table - single table for all roles

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("SUPERADMIN", "ADMIN", "SUPERUSER", "PARTICIPANT"),
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      last_modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      removed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      removed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE", "REMOVED"),
        defaultValue: "ACTIVE",
      },
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "last_modified_at",
    }
  );

  return User;
};
