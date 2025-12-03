// src/controllers/question.controller.js
import { Question } from "../models/index.js";

/**
 * 🧩 Create a new question
 */
export const createQuestion = async (req, res, next) => {
  try {
    const {
      category,
      topic,
      question_text,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_option,
      difficulty,
      batch_id,
    } = req.body;

    const question = await Question.create({
      category,
      topic,
      question_text,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_option,
      difficulty,
      batch_id,
      admin_id: req.user?.id || null,
    });

    res.status(201).json({ message: "Question created successfully", question });
  } catch (err) {
    next(err);
  }
};

/**
 * 📋 Get all questions
 */
export const getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

/**
 * 🔍 Get single question by ID
 */
export const getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    next(err);
  }
};

/**
 * ✏️ Update question
 */
export const updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    await question.update(req.body);
    res.json({ message: "Question updated successfully", question });
  } catch (err) {
    next(err);
  }
};

/**
 * 🗑️ Delete question
 */
export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    await question.destroy();
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    next(err);
  }
};
