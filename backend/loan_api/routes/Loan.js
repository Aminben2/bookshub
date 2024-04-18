import { Router } from "express";
import Loan from "../models/Loan.js";
const router = Router();

router.get("/returnLoans/:id", async (req, res) => {});
router.post("/addloan", async (req, res) => {
  const { clientId, bookId } = req.body;

  const book = await fetch("http://api/v1/book/" + bookId);
  if (!book.ok)
    return res
      .status(500)
      .json({ error: "could not get the client from client service" });

  const client = await fetch("http://api/v1/client/" + clientId);
  if (!client.ok)
    return res
      .status(500)
      .json({ error: "could not get the book from book service" });

  const loan = await Loan.create(req.body);
  if (!loan) res.status(500).json({ error: "Could not create loan" });
  return res.status(200).json(loan);
});
router.post("/returnbook", async (req, res) => {});

export default router;
