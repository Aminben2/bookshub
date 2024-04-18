import { model, Schema } from "mongoose";

const FailedLoanSchema = Schema({
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
});

export default model("FailedLoan", FailedLoanSchema);
