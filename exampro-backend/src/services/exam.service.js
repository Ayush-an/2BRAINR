// src/services/exam.service.js
const { Op } = require("sequelize");
const { Exam } = require("../models/exam.model");

exports.createExam = async (data, creatorId) => {
  const code = `EX-${Date.now()}`;
  return Exam.create({
    title: data.title,
    description: data.description,
    duration: data.duration,
    status: data.status || "Inactive",
    scheduled: data.scheduled || false,
    code,
    createdBy: creatorId,
    createdAt: new Date(),
  });
};

exports.getExams = async (filters = {}) => {
  const where = {};
  if (filters.status) where.status = filters.status;
  if (filters.adminId) where.createdBy = filters.adminId;
  if (filters.fromDate && filters.toDate) {
    where.createdAt = { [Op.between]: [filters.fromDate, filters.toDate] };
  }
  return Exam.findAll({ where });
};

exports.deleteExam = async (id, removedBy) => {
  const exam = await Exam.findByPk(id);
  if (!exam) throw new Error("Exam not found");
  exam.status = "Removed";
  exam.removedBy = removedBy;
  exam.removedAt = new Date();
  await exam.save();
  return exam;
};
