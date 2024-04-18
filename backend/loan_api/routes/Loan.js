import { Router } from "express";
import mongoose from "mongoose";
import Loan from "../models/Loan.js";
import FailedLoans from "../models/FailedLoans.js";
const router = Router();

router.get("/returnLoans/:clientId", async (req, res) => {
  const { clientId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(clientId))
    return res.status(400).json({ error: "Client id is not valid" });

  const loans = await Loan.find({ clientId });
  if (!loans) res.status(500).json({ error: "Client loans not found" });
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

  const bookRes = await fetch("http://api/v1/book/" + bookId);
  if (!bookRes.ok)
    return res
      .status(500)
      .json({ error: "could not get the client from client service" });
  const book = await bookRes.json();
  if (!book) res.status(500).json({ error: "Book not found" });

  const clientRes = await fetch("http://api/v1/client/" + clientId);
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

router.post("/returnbook/:bookId", async (req, res) => {
  const { bookId, clientId } = req.params;
  try {
    const loan = await Loan.deleteOne({ clientId, bookId });
    const clientRes = await fetch("http://api/v1/client/" + clientId);
    const client = await clientRes.json();
    if (!clientRes.ok) {
      return res.status(500).json(client);
    }

    const bookRes = await fetch("http://api/v1/book/" + bookId);
    const book = await bookRes.json();
    if (!bookRes.ok) {
      return res.status(500).json(book);
    }

    const notifRes = await fetch("http://api/v1/notification", {
      method: "POST",
      body: JSON.stringify({
        recipients: client.email,
        subject: `Great news`,
        text: `The book ${book.title} is avaible agin`,
      }),
    });
    const noti = await notifRes.json();
    return res.status(200).json({ message: "Book is returned..." });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
