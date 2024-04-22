import { Router } from "express";
import nodemailer from "nodemailer";
import { EventEmitter } from "events";

const router = Router();

// router.post("/", (req, res) => {
//   const { to, subject, text } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: false,
//     auth: {
//       user: "yassinmohamad89@gmail.com",
//       pass: "pdui ryzl lauf xxpw",
//     },
//   });

//   const mailOptions = {
//     from: "Library Application",
//     to: to,
//     subject: subject,
//     text: text,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ error: "Failed to send email" });
//     } else {
//       console.log("Email sent:", info.response);
//       res.status(200).json({ message: "Email sent successfully" });
//     }
//   });
// });

// Create an EventEmitter instance to emit WebSocket events
const eventEmitter = new EventEmitter();

router.post("/", (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: "yassinmohamad89@gmail.com",
      pass: "pdui ryzl lauf xxpw",
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

      // Emit a WebSocket event after sending the email
      eventEmitter.emit("notification", { to, subject, text });
    }
  });
});

export default router;
