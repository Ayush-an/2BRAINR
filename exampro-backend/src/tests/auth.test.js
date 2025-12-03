// src/tests/auth.test.js
const jwt = require("jsonwebtoken");
const { SuperAdmin } = require("../src/models/superAdmin.model");

describe("Auth Controller", () => {
  let token;

  test("should register a new SuperAdmin", async () => {
    const res = await request(app)
      .post("/api/auth/register/superadmin")
      .send({
        name: "John Doe",
        email: "john@exampro.com",
        mobile: "9999999999",
        password: "Password123!",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.email).toBe("john@exampro.com");
  });

  test("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        role: "SuperAdmin",
        email: "john@exampro.com",
        password: "Password123!",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  test("should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        role: "SuperAdmin",
        email: "wrong@exampro.com",
        password: "wrong",
      });

    expect(res.statusCode).toBe(401);
  });

  test("should verify JWT-protected route", async () => {
    const res = await request(app)
      .get("/api/superadmin/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe("john@exampro.com");
  });
});
