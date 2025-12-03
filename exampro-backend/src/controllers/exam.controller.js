// src/controllers/exam.controller.js
import { Exam } from "../models/index.js";
import { Op } from "sequelize";

/**
 * 🧩 Create Exam
 */
export const createExam = async (req, res, next) => {
  try {
    const { title, description, duration, status, scheduled } = req.body;
    const code = `EX-${Date.now()}`;

    const exam = await Exam.create({
      title,
      description,
      duration,
      status,
      exam_code: code,
      scheduled,
      created_by: req.user?.id || null,
    });

    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (err) {
    next(err);
  }
};

/**
 * 📋 Get All Exams
 */
export const getExams = async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const exams = await Exam.findAll({ where });
    res.json(exams);
  } catch (err) {
    next(err);
  }
};

/**
 * 🔍 Get Exam By ID
 */
export const getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    res.json(exam);
  } catch (err) {
    next(err);
  }
};

/**
 * ✏️ Update Exam
 */
export const updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    await exam.update(req.body);
    res.json({ message: "Exam updated successfully", exam });
  } catch (err) {
    next(err);
  }
};

/**
 * 🗑️ Soft Delete Exam
 */
export const deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    await exam.update({ status: "REMOVED" });
    res.json({ message: "Exam removed successfully" });
  } catch (err) {
    next(err);
  }
};

/**
 * 📂 Get Removed Exams
 */
export const getRemovedExams = async (req, res, next) => {
  try {
    const exams = await Exam.findAll({ where: { status: "REMOVED" } });
    res.json(exams);
  } catch (err) {
    next(err);
  }
};

/**
 * 📊 Export Exam Summary to Excel (Placeholder)
 */
export const exportExamSummaryToExcel = async (req, res, next) => {
  try {
    res.json({ message: "Export functionality coming soon" });
  } catch (err) {
    next(err);
  }
};
