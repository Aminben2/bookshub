import { model, Schema } from "mongoose";
const clientSchema = Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default model("client", clientSchema);
