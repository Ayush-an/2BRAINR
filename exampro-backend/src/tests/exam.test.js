// src/tests/exam.test.js
const { Exam, SuperAdmin } = require("../src/models");

describe("Exam Controller", () => {
  let token;
  let examId;

  beforeAll(async () => {
    const superAdmin = await SuperAdmin.create({
      name: "Exam Creator",
      email: "exam@exampro.com",
      mobile: "6666666666",
      password: "password",
      status: "Approved",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        role: "SuperAdmin",
        email: "exam@exampro.com",
        password: "password",
      });

    token = res.body.token;
  });

  test("should create a new Exam", async () => {
    const res = await request(app)
      .post("/api/exam")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Sample Exam",
        description: "A test exam",
        duration: 60,
        status: "Active",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe("Sample Exam");
    examId = res.body.data.id;
  });

  test("should list all exams", async () => {
    const res = await request(app)
      .get("/api/exam")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("should mark exam as removed", async () => {
    const res = await request(app)
      .delete(`/api/exam/${examId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.status).toBe("Removed");
  });
});
