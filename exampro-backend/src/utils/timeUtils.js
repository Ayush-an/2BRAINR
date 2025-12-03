// src/utils/timeUtils.js
const moment = require("moment-timezone");

exports.getCurrentDateTime = (tz = "Asia/Kolkata") => {
  return moment().tz(tz).format("YYYY-MM-DD HH:mm:ss");
};

exports.formatDate = (date, tz = "Asia/Kolkata") => {
  return moment(date).tz(tz).format("YYYY-MM-DD HH:mm:ss");
};

exports.timeDiffInMinutes = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);
  return moment.duration(endTime.diff(startTime)).asMinutes();
};
