import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import routeNotification from "./routes/notification.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = process.env.PORT;
const url_db = process.env.DB_URL;

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

app.use("/api/v1/sendNotification", routeNotification);
