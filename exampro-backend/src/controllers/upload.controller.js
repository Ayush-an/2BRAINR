// src/controllers/upload.controller.js
const xlsx = require("xlsx");
const { Participant } = require("../models/participant.model");
const { Question } = require("../models/question.model");

exports.uploadParticipants = async (req, res, next) => {
  try {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const inserted = await Participant.bulkCreate(rows);
    res.status(201).json({ message: "Participants uploaded", count: inserted.length });
  } catch (err) {
    next(err);
  }
};

exports.uploadQuestions = async (req, res, next) => {
  try {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const inserted = await Question.bulkCreate(rows);
    res.status(201).json({ message: "Questions uploaded", count: inserted.length });
  } catch (err) {
    next(err);
  }
};
