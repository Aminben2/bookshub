import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

// Routes
import BookRouter from "./routes/Book.js";
import requireAuth from "./middleware/requireAuth.js";

//Configs
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 3002;
const url_db = process.env.URL_MONGOOSE;

connect(url_db)
  .then(() => {
    console.log("Connected to Mongodb");
    app.listen(port, (err) => {
      if (err) console.log("Server not started");
      else console.log("Server started");
    });
  })
  .catch((err) => {
    console.log("Not Connected to Mongodb");
  });

// Upload logic :

// Determine the current module's directory using import.meta.url
const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);

// Use the current module's directory to construct the uploads directory path
const uploadsDirectory = path.join(currentModuleDir, "uploads");

// Create the "uploads" directory if it doesn't exist
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Endpoint for multiple file uploads
app.post("/upload", upload.array("files", 10), (req, res) => {
  // You can access the file information through req.files
  // Perform any necessary processing or validation here
  const filenames = req.files.map((file) => file.filename);
  res.status(200).json({ url: filenames });
});

// End points
// app.use(requireAuth);
app.use("/api/v1/book", BookRouter);
