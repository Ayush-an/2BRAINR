export default (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "Admin" },
    organizationId: {
      type: DataTypes.INTEGER,
      references: { model: "Organizations", key: "id" },
    },
  });

  Admin.associate = (models) => {
    Admin.belongsTo(models.Organization, { foreignKey: "organizationId" });
    Admin.hasMany(models.SuperUser, { foreignKey: "adminId" });
  };

  return Admin;
};
