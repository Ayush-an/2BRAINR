// src/tests/setup.js
const request = require("supertest");
const app = require("../../app");
const { sequelize } = require("../src/models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

global.request = request;
global.app = app;
