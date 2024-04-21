import { Router } from "express";
import Book from "../models/Book.js";
import mongoose from "mongoose";
import axios from "axios";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: "Books not found" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const loan = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Book id is not valid" });

  const book = await Book.findOne({ _id: id });
  if (!book) return res.status(404).json({ error: "Book not found" });

  return res.status(200).json(book);
});

router.post("/", async (req, res) => {
  const newBook = req.body;

  if (!newBook) {
    return res.status(400).json({ error: "Request Body is empty" });
  }

  try {
    const book = await Book.create(newBook);
    const clientsResponse = await axios.get(
      "http://127.0.0.1:3000/api/v1/client"
    );
    const clients = clientsResponse.data;

    const notificationPromises = clients.map(async (clt) => {
      const emailData = {
        to: clt.email,
        subject: `${book.title} available in our platform`,
        text: book.description,
      };

      try {
        await axios.post(
          "http://localhost:3001/api/v1/sendNotification",
          emailData
        );
        console.log(`Notification sent to ${clt.email}`);
      } catch (error) {
        console.error(
          `Error sending notification to ${clt.email}:`,
          error.message
        );
      }
    });

    await Promise.all(notificationPromises);

    res.status(201).json({
      message: "Book added successfully and notifications sent to clients.",
      book: book,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error creating book or sending notifications" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid book ID" });
    const book = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Could not update book" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid book ID" });
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete book" });
  }
});

export default router;
