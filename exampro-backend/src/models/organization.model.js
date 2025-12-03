// src/models/organization.model.js

export default (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    "Organization",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        field: "name",
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      email: {
        field: "email",
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      country: {
        type: DataTypes.STRING(100),
      },
      state: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.STRING(20),
      },
      address: {
        type: DataTypes.TEXT,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "organizations",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Organization;
};
