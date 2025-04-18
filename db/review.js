import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    bookId: Types.ObjectId,
    userId: Types.ObjectId,
    text: String,
  },
  { timestamps: true }
);

export const Review = model();
