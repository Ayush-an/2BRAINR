// src/models/user.model.js
export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    full_name: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    mobile: { type: DataTypes.STRING(20), allowNull: true },
    role: { type: DataTypes.ENUM("SUPERADMIN","ADMIN","SUPERUSER","PARTICIPANT"), allowNull: false },
    organization_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: "Organizations", key: "id" } },
    approved: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.ENUM("ACTIVE","INACTIVE","REMOVED"), defaultValue: "ACTIVE" },
  });

  User.associate = (models) => {
    User.belongsTo(models.Organization, { foreignKey: "organization_id" });
  };

  return User;
};
