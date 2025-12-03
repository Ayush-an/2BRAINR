// src/utils/generatePassword.js
const crypto = require("crypto");

exports.generatePassword = (length = 10) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(crypto.randomInt(0, chars.length));
  }
  return password;
};
