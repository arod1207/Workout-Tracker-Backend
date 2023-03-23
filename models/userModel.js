import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method//
userSchema.statics.signup = async function (email, password) {
  const exist = await this.findOne({ email });

  //Validation
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough.");
  }

  if (exist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);

  const hashed = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashed });

  return user;
};

//Static login method//
userSchema.statics.login = async function (email, password) {
  // Checking if fields are empty//
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid email/password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid email/password");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);
