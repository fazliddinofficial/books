import { model, Schema, Types } from "mongoose";
import { SCHEMA_NAMES } from "../constant/modelNames.js";

const reviewSchema = new Schema(
  {
    bookId: Types.ObjectId,
    userId: Types.ObjectId,
    text: String,
  },
  { timestamps: true }
);

export const Review = model(SCHEMA_NAMES.REVIEW, reviewSchema);
