import express from "express";
import { sendMail } from "../services/mail.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sendMail(
      to,
      subject,
      `<p>${message}</p>`
    );

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

export default router;
