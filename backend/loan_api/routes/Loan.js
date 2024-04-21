import { Router } from "express";
import mongoose from "mongoose";
import Loan from "../models/Loan.js";
import axios from "axios";
import FailedLoans from "../models/FailedLoans.js";
const router = Router();

router.get("/:clientId", async (req, res) => {
  const { clientId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(clientId))
    return res.status(400).json({ error: "Client id is not valid" });
  const loans = await Loan.find({ clientId: clientId });
  if (loans.length == 0)
    return res.status(500).json({ error: "Client loans not found " });
  return res.status(200).json(loans);
});

router.post("/addloan", async (req, res) => {
  const { clientId, bookId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(clientId))
    return res.status(400).json({ error: "Client id is not valid" });

  if (!mongoose.Types.ObjectId.isValid(bookId))
    return res.status(400).json({ error: "Book id is not valid" });

  const isLoaned = await Loan.findOne({ bookId });
  if (isLoaned) {
    const failedLoan = await FailedLoans.create({ clientId, bookId });
    if (!failedLoan) res.status(500).json({ error: "Falied loan not created" });
    return res
      .status(200)
      .json({ error: "Book is already loaned wait for updates" });
  }

  const bookRes = await fetch("http://localhost:3002/api/v1/book/" + bookId);
  if (!bookRes.ok)
    return res
      .status(500)
      .json({ error: "could not get the client from client service" });
  const book = await bookRes.json();
  if (!book) res.status(500).json({ error: "Book not found" });

  const clientRes = await fetch(
    "http://localhost:3000/api/v1/client/" + clientId
  );
  if (!clientRes.ok)
    return res
      .status(500)
      .json({ error: "could not get the book from book service" });
  const client = await clientRes.json();
  if (!client) res.status(500).json({ error: "Client not found" });

  const loan = await Loan.create(req.body);
  if (!loan) res.status(500).json({ error: "Could not create loan" });
  return res.status(200).json(loan);
});

router.post("/returnbook/:bookId/:clientId", async (req, res) => {
  const { bookId, clientId } = req.params;
  try {
    const failedLoans = await FailedLoans.find({ bookId });

    const bookRes = await axios.get(
      "http://localhost:3002/api/v1/book/" + bookId
    );
    const book = bookRes.data;
    if (!book) {
      return res.status(500).json({ error: "Book not found" });
    }

    const notificationPromises = failedLoans.map(async (failedloan) => {
      try {
        const failedLoanRes = await axios.get(
          "http://localhost:3000/api/v1/client/" + failedloan.clientId
        );
        const failedLoan = failedLoanRes.data;
        if (!failedLoan) {
          return res.status(500).json({ error: "Failed loan not found" });
        }
        if (!failedLoan.email) {
          return res.status(500).json({
            error: `Error sending notification: No email found for client ${failedLoan._id}`,
          });
        }

        const emailData = {
          to: failedLoan.email,
          subject: " Great news",
          text: `The book ${book.title} is available again`,
        };

        await axios.post(
          "http://localhost:3001/api/v1/sendNotification",
          emailData
        );
      } catch (error) {
        return res
          .status(500)
          .json({ error: `Error sending notification: ${error.message}` });
      }
    });

    await Promise.all(notificationPromises);

    const loan = await Loan.deleteOne({ clientId, bookId });
    if (!loan.deletedCount == 1)
      return res.status(500).json({ error: "Could not delete client Loan" });

    const { deletedCount } = await FailedLoans.deleteMany(failedLoans);
    if (!deletedCount == 0)
      return res
        .status(500)
        .json({ error: "Could not delete failedLoans for this book" });

    return res.status(200).json({ message: "Book is returned..." });
    
  } catch (error) {
    console.error(`Error returning book: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
