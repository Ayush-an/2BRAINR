// src/models/question.model.js

export default (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING(150),
      },
      topic: {
        type: DataTypes.STRING(150),
      },
      question_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      option_1: {
        type: DataTypes.TEXT,
      },
      option_2: {
        type: DataTypes.TEXT,
      },
      option_3: {
        type: DataTypes.TEXT,
      },
      option_4: {
        type: DataTypes.TEXT,
      },
      correct_option: {
        type: DataTypes.ENUM("1", "2", "3", "4"),
      },
      difficulty: {
        type: DataTypes.ENUM("EASY", "MEDIUM", "HARD"),
      },
      batch_id: {
        type: DataTypes.STRING(100),
      },
      status: {
        type: DataTypes.ENUM("VALID", "INVALID", "DUPLICATED", "PENDING", "IMPORTED"),
        defaultValue: "PENDING",
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "questions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Question;
};
