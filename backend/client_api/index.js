import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "mongoose";
import routerClient from "./routes/client.js";
import requireAuth from "./middleware/requireAuth.js";

dotenv.config();
const port = process.env.PORT || 3000;
const url = process.env.URL_MONGOOSE;
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

  
app.use(requireAuth);
app.use("/api/v1/client", routerClient);
