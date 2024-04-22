import { Router } from "express";
import ClientModel from "../model/client.js";
import JWT from "jsonwebtoken";

const router = Router();

// Token validation endpoint
router.post("/validate-token", async (req, res) => {
  const token = req.body.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await ClientModel.findById(decoded._id);
    if (user) {
      res.status(200).json({ valid: true, user });
    } else {
      res.status(401).json({ valid: false, message: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ valid: false, error: error.message });
  }
});

// Create Token
const createToken = (_id) => {
  return JWT.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

router.post("/signup", async (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;

  try {
    const client = await ClientModel.signup(
      username,
      password,
      firstName,
      lastName,
      email
    );

    // create token for user
    const token = createToken(client._id);
    res.status(200).json({ _id: client._id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await ClientModel.login(username, password);

    // create token
    const token = createToken(client._id);

    res.status(200).json({ _id: client._id, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
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

    const existingClient = await ClientModel.findOne({ _id: clientId });
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
    if (!existingClient)
      return res.status(404).json({ error: "client not found" });
    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error of deleting client:", error);

    return res.status(500).json({ error: "internal server error" });
  }
});

export default router;
