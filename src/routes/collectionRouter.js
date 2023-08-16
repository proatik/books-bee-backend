/***
 * Title : Collections Router.
 * Author : Atik Ullah Khan.
 * Description : All the routes related to collection.
 * Date : 14/08/2023.
 ***/

const express = require("express");
const asyncWrapper = require("express-async-handler");

// collections controller.
const {
  addBook,
  removeBook,
  getBookList,
  getCollections,
  createCollection,
} = require("../controllers/collectionsController");

// express router.
const router = express.Router();

// collections routes.
router
  .route("/")
  .get(asyncWrapper(getCollections))
  .post(asyncWrapper(createCollection));

router
  .get("/books/:collection_id", asyncWrapper(getBookList))
  .post("/books/add", asyncWrapper(addBook))
  .delete("/books/remove", asyncWrapper(removeBook));

module.exports = router;
