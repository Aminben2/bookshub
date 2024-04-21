import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const clientSchema = Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

clientSchema.statics.login = async function (username, password) {
  if (!password || !username) {
    throw Error("All fields required");
  }
  const user = await this.findOne({ username: username });
  if (!user) {
    throw Error("Username/password is incorrect");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Username/password is incorrect");
  }
  return user;
};

clientSchema.statics.signup = async function (
  username,
  password,
  firstName,
  lastName,
  email
) {
  const existUsername = await this.findOne({ username: username });
  const existEmail = await this.findOne({ email: email });

  // Validation
  if (!username || !password || !firstName || !lastName || !email) {
    throw Error("All fields required");
  }

  if (existUsername) {
    throw Error("Acount already existe");
  }
  if (existEmail) {
    throw Error("Acount already existe");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email invalid, Try again");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Weak Password");
  }
  if (!validator.isAlpha(lastName)) {
    throw Error("Last name is invalid, Only characters");
  }
  if (!validator.isAlpha(firstName)) {
    throw Error("Fisrt name is invalid, Only characters");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPasswod = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hashedPasswod,
    firstName,
    lastName,
    email,
  });
  return user;
};

export default model("client", clientSchema);
