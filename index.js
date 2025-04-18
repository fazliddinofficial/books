import express from "express";
import { connect } from "mongoose";
import { Book } from "./db/book.js";

const app = express();

const PORT = 4000;
const MONGODB_URL = "mongodb://localhost:27017/book";

app.get("/books", async (req, res) => {
  try {
    const foundBooks = await Book.find({});

    res.status(200).json(foundBooks);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/books/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;

    const foundBooks = await Book.find({ ISBN: isbn });

    res.status(200).json(foundBooks);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/books/author/:authorName", async (req, res) => {
  const { authorName } = req.params;
  try {
    const books = await Book.find({ author: authorName });
    res.json(books);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching books by author", error: err.message });
  }
});

app.get("/books/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const foundBooks = await Book.find({ title: title });

    res.status(200).json(foundBooks);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  connect(MONGODB_URL)
    .then(() => {
      console.log("Mongo db connected! Sir!");
    })
    .catch((err) => console.log(err));
  console.log("Jarvis: Our server is up and ready to fly!");
});
