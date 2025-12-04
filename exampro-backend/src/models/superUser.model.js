// src/models/superUser.model.js
export default (sequelize, DataTypes) => {
  const SuperUser = sequelize.define("SuperUser", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "SuperUser" },
    adminId: {
      type: DataTypes.INTEGER,
      references: { model: "Admins", key: "id" },
    },
    organizationId: {
      type: DataTypes.INTEGER,
      references: { model: "Organizations", key: "id" },
    },
  });

  SuperUser.associate = (models) => {
    SuperUser.belongsTo(models.Admin, { foreignKey: "adminId" });
    SuperUser.belongsTo(models.Organization, { foreignKey: "organizationId" });
  };

  return SuperUser;
};
