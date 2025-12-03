/**
 * Seed Script: Create the First SuperAdmin
 * ----------------------------------------
 * This script creates the initial SuperAdmin directly in the database.
 * Run it once after syncing the models:
 *    node seed/seedSuperAdmin.js
 */

require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sequelize } = require("../src/models");
const { SuperAdmin } = require("../src/models/superAdmin.model");

(async () => {
  try {
    // Connect to DB
    await sequelize.authenticate();
    console.log("✅ Database connection established.");

    // Check if a SuperAdmin already exists
    const existingSuperAdmin = await SuperAdmin.findOne();
    if (existingSuperAdmin) {
      console.log("⚠️ SuperAdmin already exists. Exiting seed script.");
      process.exit(0);
    }

    // Create the first SuperAdmin
    const password = process.env.SUPERADMIN_PASSWORD || "Super@123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const superAdmin = await SuperAdmin.create({
      name: "Ayush Agrawal Primary SuperAdmin",
      email: process.env.SUPERADMIN_EMAIL || "superadmin@exampro.com",
      mobile: "9657602184",
      password: hashedPassword,
      role: "SuperAdmin",
      status: "Approved",
      dateOfJoin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("🎉 SuperAdmin created successfully:");
    console.log({
      id: superAdmin.id,
      name: superAdmin.name,
      email: superAdmin.email,
      password: password, // plain text (for development only)
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding SuperAdmin:", error);
    process.exit(1);
  }
})();
