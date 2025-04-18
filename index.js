import express from "express";
import { connect } from "mongoose";
import { Book } from "./db/book.js";
import { User } from "./db/user.js";
import { Review } from "./db/review.js";
import jwt from "jsonwebtoken";

const app = express();
const bookRoute = express();
const userRoute = express();
const reviewRoute = express();

app.use(express.json());

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

userRoute.post("/auth/login", async (req, res) => {
  try {
    const data = req.body.data;

    const foundUser = await User.findOne({ email: data.email });

    if (!foundUser) {
      res.status(404).send("User not found!");
      return;
    }

    const token = jwt.sign({ user: foundUser.email }, JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).send({ token: token, user: foundUser });
  } catch (error) {
    throw new Error(error);
  }
});

reviewRoute.post("/reviews", async (req, res) => {
  try {
    const data = req.body;

    const createdReview = await Review.create(data);

    res.status(201).send(createdReview);
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
});

reviewRoute.put("/reviews/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;

    const foundReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });

    if (!foundReview) {
      res.status(404).send("Review not found!");
      return;
    }

    res.status(200).send(foundReview);
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
});

reviewRoute.delete("/reviews/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      res.status(404).send("Review not found!");
      return;
    }

    res.status(200).send("Review deleted!");
  } catch (error) {
    throw new Error(error);
  }
});

reviewRoute.delete("/reviews/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    await Review.findOneAndDelete({ userId: userId });

    res.status(200).send("Review deleted successfully!");
  } catch (error) {
    res.status(500).send("Internal server error!");
  }
});

reviewRoute.get('/books/search-title', (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: 'Title query is required' });
  }

  Book.find({ title: new RegExp(title, 'i') }) 
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error searching books by title', error: err.message });
    });
});

bookRoute.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;

  Book.findOne({ isbn: isbn })
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error searching by ISBN', error: err.message });
    });
});


app.listen(PORT, () => {
  connect(MONGODB_URL)
    .then(() => {
      console.log("Jarvis: Mongo db connected! Sir!");
    })
    .catch((err) => console.log(err));
  console.log("Our server is up and ready to fly!");
});
