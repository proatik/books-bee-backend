/***
 * Title : Books Router.
 * Author : Atik Ullah Khan.
 * Description : All the routes related to books.
 * Date : 14/08/2023.
 ***/

const express = require("express");
const asyncWrapper = require("express-async-handler");

// books controller functions.
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getAuthors,
} = require("../controllers/booksController");

// express router.
const router = express.Router();

// books routes.
router.route("/").get(asyncWrapper(getBooks)).post(asyncWrapper(createBook));

router.route("/authors").get(asyncWrapper(getAuthors));

router
  .route("/:book_id")
  .patch(asyncWrapper(updateBook))
  .delete(asyncWrapper(deleteBook));

module.exports = router;
