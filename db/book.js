import { model, Schema } from "mongoose";
import { SCHEMA_NAMES } from "../constant/modelNames.js";

const bookSchema = new Schema({
  title: String,
  price: String,
  ISBN: String,
  authorName: String,
});

export const Book = model(SCHEMA_NAMES.BOOK, bookSchema);
