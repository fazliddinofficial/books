import express from "express";
import { connect, trusted } from "mongoose";
import { Book } from "./db/book.js";
import { User } from "./db/user.js";
import jwt from "jsonwebtoken";

const app = express();
const bookRoute = express();
const userRoute = express();

const PORT = 4000;
const MONGODB_URL = "mongodb://localhost:27017/book";
const JWT_SECRET_KEY =
  "e4d35ef6fba5022db813be0cec22ad6fb0dda5c3bb91e663ccd7b48e846be859fe99eaced30f4ab1e5d7419f1e967f34b17416fa3954e07b453434225f6a7441";

bookRoute.get("/books", async (req, res) => {
  try {
    const foundBooks = await Book.find({});

    res.status(200).json(foundBooks);
  } catch (error) {
    throw new Error(error);
  }
});

bookRoute.get("/books/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;

    const foundBooks = await Book.find({ ISBN: isbn });

    res.status(200).json(foundBooks);
  } catch (error) {
    throw new Error(error);
  }
});

bookRoute.get("/books/author/:authorName", async (req, res) => {
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

bookRoute.get("/books/:title", async (req, res) => {
  try {
    const { title } = req.params;

    const foundBooks = await Book.find({ title: title });

    res.status(200).json(foundBooks);
  } catch (error) {
    throw new Error(error);
  }
});

userRoute.post("/auth/signUp", async (req, res) => {
  try {
    const user = req.body.user;

    const createdUser = await User.create(user);

    const token = jwt.sign({ email: createdUser.email }, JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(201).send(token, createdUser._id);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(PORT, () => {
  connect(MONGODB_URL)
    .then(() => {
      console.log("Jarvis: Mongo db connected! Sir!");
    })
    .catch((err) => console.log(err));
  console.log("Our server is up and ready to fly!");
});
