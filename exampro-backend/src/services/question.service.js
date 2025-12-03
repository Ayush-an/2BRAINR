// src/services/question.service.js
const { Question } = require("../models/question.model");
const xlsx = require("xlsx");

exports.createQuestion = async (data, createdBy) => {
  return Question.create({
    category: data.category,
    topic: data.topic,
    text: data.text,
    options: data.options,
    correctOption: data.correctOption,
    difficulty: data.difficulty,
    createdBy,
  });
};

exports.uploadQuestionsFromExcel = async (filePath, createdBy) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet);

  const formatted = rows.map((row) => ({
    category: row.Category,
    topic: row.Topic,
    text: row.QuestionText,
    options: [row.Option1, row.Option2, row.Option3, row.Option4],
    correctOption: row.CorrectOption,
    difficulty: row.DifficultyLevel,
    createdBy,
  }));

  return Question.bulkCreate(formatted);
};

exports.getQuestions = async (filters = {}) => {
  return Question.findAll({ where: filters });
};
