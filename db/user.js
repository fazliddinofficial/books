import { model, Schema } from "mongoose";
import { SCHEMA_NAMES } from "../constant/modelNames.js";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  books: [String],
  email: String,
  password: String,
});

export const User = model(SCHEMA_NAMES.USER, userSchema);
