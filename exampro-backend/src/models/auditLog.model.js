// src/models/auditLog.model.js
 
export default (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    "AuditLog",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      table_name: {
        type: DataTypes.STRING(150),
      },
      record_id: {
        type: DataTypes.INTEGER,
      },
      field_name: {
        type: DataTypes.STRING(150),
      },
      old_value: {
        type: DataTypes.TEXT,
      },
      new_value: {
        type: DataTypes.TEXT,
      },
      changed_by: {
        type: DataTypes.INTEGER,
      },
      changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "audit_logs",
      timestamps: false,
    }
  );

  return AuditLog;
};