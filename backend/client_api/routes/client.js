import { Router } from "express";
import ClientModel from "../model/client.js";
import mongosse from "mongoose";
const router = Router();

router.get("/:idClient", async (req, res) => {
  try {
    const clientId = req.params.idClient;
    const client = await ClientModel.findOne({ _id: clientId });
    if (!client) return res.status(404).json({ error: "client not found" });
    return res.status(200).json(client);
  } catch (error) {
    console.error("Error creating client:", error);
    return res.status(500).json({ error: " find internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newClient = req.body;
    if (!newClient) return res.status(404).json({ error: "body is empty" });
    const client = await ClientModel.create(newClient);
    if (!client)
      return res.status(500).json({ error: "could not create client" });
    return res.status(200).json(client);
  } catch (error) {
    console.error("Error creating client:", error);

    return res.status(500).json({ error: " add internal server error" });
  }
});

router.put("/:idClient", async (req, res) => {
  try {
    const clientId = req.params.idClient;
    console.log(clientId);
    const updatedClientdata = req.body;

    if (!updatedClientdata)
      return res.status(404).json({ error: " body is emptyd" });

    const existingClient = await ClientModel.findOne({_id : clientId});
    if (!existingClient)
      return res.status(404).json({ error: "client not found" });

    existingClient.set(updatedClientdata);
    const updatedClient = await existingClient.save();
    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error of modification client:", error);
    return res.status(500).json({ error: " internal server error" });
  }
});

router.delete("/:idClient", async (req, res) => {
  try {
    const clientId = req.params.idClient;
    const existingClient = await ClientModel.findByIdAndDelete(clientId);
    if (!existingClient) return res.status(404).json({ error: "client not found" });
    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
        console.error("Error of deleting client:", error);

    return res.status(500).json({ error: "internal server error" });
  }
});

export default router;
