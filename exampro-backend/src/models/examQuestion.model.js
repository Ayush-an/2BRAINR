// src/models/examQuestion.model.js join table exam_questions

export default (sequelize, DataTypes) => {
  const ExamQuestion = sequelize.define(
    "ExamQuestion",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exam_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "exam_questions",
      timestamps: false,
    }
  );

  return ExamQuestion;
};
