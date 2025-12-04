export default (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    "Organization",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: true },
      country: { type: DataTypes.STRING, allowNull: true },
      state: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: true },
      status: { type: DataTypes.ENUM("Active","Inactive","Pending"), defaultValue: "Active" },
      created_by: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      tableName: "organizations",   // ensure correct table
      timestamps: true,
      createdAt: "created_at",      // map to your DB column
      updatedAt: "updated_at"
    }
  );

  Organization.associate = (models) => {
    Organization.hasMany(models.Admin, { foreignKey: "organizationId" });
    Organization.hasMany(models.SuperUser, { foreignKey: "organizationId" });
    Organization.hasMany(models.User, { foreignKey: "organization_id" });
  };

  return Organization;
};
