// src/tests/admin.test.js
const { SuperAdmin, Admin, Organization } = require("../src/models");

describe("Admin Controller", () => {
  let superAdminToken;
  let orgId;

  beforeAll(async () => {
    // Create a SuperAdmin and login
    const superAdmin = await SuperAdmin.create({
      name: "Main SuperAdmin",
      email: "main@exampro.com",
      mobile: "8888888888",
      password: "password",
      status: "Approved",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        role: "SuperAdmin",
        email: "main@exampro.com",
        password: "password",
      });

    superAdminToken = res.body.token;

    // Create organization
    const orgRes = await request(app)
      .post("/api/organization")
      .set("Authorization", `Bearer ${superAdminToken}`)
      .send({
        name: "Test Organization",
        description: "Org for testing Admins",
      });
    orgId = orgRes.body.data.id;
  });

  test("should create a new Admin under organization", async () => {
    const res = await request(app)
      .post("/api/admin")
      .set("Authorization", `Bearer ${superAdminToken}`)
      .send({
        name: "Admin User",
        email: "admin@exampro.com",
        mobile: "7777777777",
        password: "Password123!",
        organizationId: orgId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.email).toBe("admin@exampro.com");
  });

  test("should fetch all Admins for organization", async () => {
    const res = await request(app)
      .get(`/api/admin?organizationId=${orgId}`)
      .set("Authorization", `Bearer ${superAdminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test("should approve an Admin", async () => {
    const admin = await Admin.findOne({ where: { email: "admin@exampro.com" } });

    const res = await request(app)
      .patch(`/api/admin/approve/${admin.id}`)
      .set("Authorization", `Bearer ${superAdminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.status).toBe("Approved");
  });
});
