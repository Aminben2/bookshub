import { model, Schema } from "mongoose";

const LoanSchema = Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    validate: {
      validator: (value) => Types.ObjectId.isValid(value),
      message: (props) => `${props.value} is not a valid ObjectId`,
    },
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    validate: {
      validator: (value) => Types.ObjectId.isValid(value),
      message: (props) => `${props.value} is not a valid ObjectId`,
    },
    required: true,
  },
  loanDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  returnDate: {
    type: Date,
    default: null,
  },
});

export default model("loan", LoanSchema);
