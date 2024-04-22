import { model, Schema } from "mongoose";

const BookSchema = Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  loaned: {
    type: Boolean,
    default: false,
  },
});

export default model("book", BookSchema);
