import { Router } from "express";
import Loan from "../models/Loan.js";
const router = Router();

router.get("/returnLoans/:id", async (req, res) => {});
router.post("/addloan", async (req, res) => {
  const loan = req.body;

  try {
    const clientsResponse = await axios.get(
      "http://localhost:3000/api/v1/client"
    );
    const clients = clientsResponse.data;

    for (const client of clients) {
      const emailData = {
        to: client.email,
        subject: loan.title,
        text: loan.description,
      };

      const notificationResponse = await axios.post(
        "http://localhost:3000/api/v1/sendNotification",
        emailData
      );
      console.log("Response:", notificationResponse.data);
    }

    res
      .status(200)
      .json({
        message: "Loan added successfully and notifications sent to clients.",
      });
  } catch (error) {
    console.error("Error adding loan and sending notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/returnbook", async (req, res) => {});

export default router;
