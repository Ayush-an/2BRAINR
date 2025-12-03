// src/models/exam.model.js

export default (sequelize, DataTypes) => {
  const Exam = sequelize.define(
    "Exam",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      duration: {
        type: DataTypes.INTEGER, // minutes
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE", "SCHEDULED", "COMPLETED"),
        defaultValue: "INACTIVE",
      },
      exam_code: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      scheduled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "exams",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Exam;
};