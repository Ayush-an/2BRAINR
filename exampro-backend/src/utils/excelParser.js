// src/utils/excelParser.js
const XLSX = require("xlsx");

/**
 * Parses Excel or CSV file into JSON
 * @param {Buffer} fileBuffer - The uploaded file buffer (from Multer)
 * @returns {Array<Object>} Parsed rows
 */
exports.parseExcelFile = (fileBuffer) => {
  try {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    return jsonData;
  } catch (error) {
    console.error("Excel parsing error:", error);
    throw new Error("Invalid Excel file format");
  }
};
