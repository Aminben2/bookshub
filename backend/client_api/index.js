import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "mongoose";
import routerClient from "./routes/client.js";

dotenv.config();
const port = process.env.PORT || 3000;
const url = process.env.URL_MONGOOSE;
console.log(url);
const app = express();

app.use(express.json());
app.use(cors());

connect(url)
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

  app.get("//api/v1/client", async (req, res) => {
    try {
      const clients = await ClientModel.find({});
      if (!clients || clients.length === 0)
        return res.status(404).json({ error: "No clients found" });
      return res.status(200).json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
