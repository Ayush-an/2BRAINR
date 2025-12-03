// src/middlewares/activityLogger.js
import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = path.join(logDir, "activity.log");

/**
 * Logs user activity in text file (can be expanded for DB logging)
 */
export const activityLogger = (action) => {
  return (req, res, next) => {
    const user = req.user ? `${req.user.role} (${req.user.email})` : "Guest";
    const logEntry = `[${new Date().toISOString()}] User: ${user} - Action: ${action} - Path: ${req.originalUrl}\n`;
    fs.appendFileSync(logFile, logEntry, "utf8");
    next();
  };
};
