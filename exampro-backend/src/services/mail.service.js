import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"ExamPro Notifications" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("📧 Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email send error:", error.message);
    throw error;
  }
};

export const sendApprovalEmail = async (superAdmin) => {
  const subject = "New SuperAdmin Awaiting Approval";
  const html = `
    <h3>Approval Required</h3>
    <p>A new SuperAdmin has registered and requires approval:</p>
    <ul>
      <li>Name: ${superAdmin.name}</li>
      <li>Email: ${superAdmin.email}</li>
      <li>Mobile: ${superAdmin.mobile}</li>
    </ul>
    <p>Login to your ExamPro dashboard to approve or reject this account.</p>
  `;
  await sendMail(process.env.SUPERADMIN_EMAIL, subject, html);
};
