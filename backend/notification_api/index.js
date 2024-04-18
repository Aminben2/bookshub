import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import routeNotification from "./routes/notification.js";


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const port = process.env.PORT || 3000;


app.listen(port, (err) => {
  if (err) console.log("Server not started");
  else console.log("Server started");
});

app.use("/api/v1/sendNotification", routeNotification);
