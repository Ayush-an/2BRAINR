// src/controllers/activity.controller.js
import { Op } from "sequelize";
import { Activity } from "../models/index.js";

export const getActivityLog = async (req, res, next) => {
  try {
    const { dateFrom, dateTo } = req.query;
    const where = {};

    if (dateFrom && dateTo) {
      where.created_at = { [Op.between]: [dateFrom, dateTo] };
    }

    const logs = await Activity.findAll({ where });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};
