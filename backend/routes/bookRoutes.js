import express from "express";
import { Book } from "../models/bookmodel.js";

const router = express.Router();
// To create new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const createdBook = await Book.create(newBook);
    return res.status(201).send(createdBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
//* Route for all books in database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    const retrevedBooks = {
      count: books.length,
      data: books,
    };
    return res.status(200).json(retrevedBooks);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//* Route for one book from database by id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// * Route for Update a Book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "Book Not Found" });
    }
    return res.status(200).send({ message: "Book Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// * Route for  Deleting book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      return res.status(404).send({ message: "Book not Deleted" });
    }
    return res.status(200).send({ message: "Book Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
