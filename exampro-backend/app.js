// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./src/models/index.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";

// Import routes
import authRoutes from "./src/routes/auth.routes.js";
import organizationRoutes from "./src/routes/organization.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import superUserRoutes from "./src/routes/superuser.routes.js";
import participantRoutes from "./src/routes/participant.routes.js";
import examRoutes from "./src/routes/exam.routes.js";
import questionRoutes from "./src/routes/question.routes.js";
import groupRoutes from "./src/routes/group.routes.js";
import activityRoutes from "./src/routes/activity.routes.js";
import { logger } from "./src/config/logger.js";
import user from "./src/routes/user.routes.js";
import emailRoutes from "./src/routes/email.routes.js";
import superAdminRoutes from "./src/routes/superAdmin.routes.js";

//import uploadRoutes from "./src/routes/";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Base routes
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/superuser", superUserRoutes);
app.use("/api/participant", participantRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/activity", activityRoutes);

app.use("/api/user", user);
//app.use("/api/upload", uploadRoutes);
app.use("/api/send-email", emailRoutes);
// Health check
app.get("/", (req, res) => {
  res.json({ message: "🚀 ExamPro Backend API Running" });
});

// Error handling
app.use(errorHandler);

// Sync database and start server
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully.");
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      logger.info(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    logger.error("Database connection failed", err);
  });
export default app;