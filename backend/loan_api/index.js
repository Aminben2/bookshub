import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import dotenv from "dotenv";

// Routes
import LoanRouter from "./routes/Loan.js";
import requireAuth from "./middleware/requireAuth.js";

//Configs
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 3000;
const url_db = process.env.DB_URL;

// Database Connection
connect(url_db)
  .then(() => {
    console.log("Connected to db");
    app.listen(port, (err) => {
      if (err) console.log("Failed to start the server");
      else console.log("Server started");
    });
  })
  .catch((err) => {
    if (err) console.log(err);
  });

// End points
app.use(requireAuth);
app.use("/api/v1/loan", LoanRouter);
