import { Router } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { EventEmitter } from "events";
dotenv.config();
const router = Router();

router.post("/", (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: process.env.NOTI_USER,
      pass: process.env.NOTI_PASS,
    },
  });

  const mailOptions = {
    from: "Library Application",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

export default router;
