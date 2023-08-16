/***
 * Title : Books Controller.
 * Author : Atik Ullah Khan.
 * Description : CRUD operations on books table.
 * Date : 14/08/2023.
 ***/

// database connection instance.
const { connection } = require("../configs/database");

// utility functions.
const queryBuilder = require("../utils/queryBuilder");

// module scaffolding.
const books = {};

// get all books.
books.getBooks = async (req, res) => {
  const { collection_id, author, search } = req.query;

  const query = queryBuilder(collection_id, author, search);

  const queryParams = [];

  if (collection_id) {
    queryParams.push(collection_id);
  }

  if (author) {
    queryParams.push(`%${author}%`);
  }

  if (search) {
    queryParams.push(`%${search}%`);
  }

  const [rows] = await (await connection).query(query, queryParams);

  res.status(200).json({ status: 200, books: rows });
};

// get all authors.
books.getAuthors = async (_req, res) => {
  let [authors] = await (
    await connection
  ).query("SELECT DISTINCT author AS name FROM books");

  authors = authors.map(({ name }, index) => ({ name, id: index + 1 }));

  res.status(200).json({ status: 200, authors });
};

// create a book.
books.createBook = async (req, res) => {
  const { name, author, price } = req.body;

  const [result] = await (
    await connection
  ).query("INSERT INTO books (name, author, price) VALUES (?, ?, ?)", [
    name,
    author,
    price,
  ]);

  if (result.insertId) {
    const book = {
      name,
      price,
      author,
      book_id: result.insertId,
    };

    res.status(201).json({ status: 201, book });
  }
};

// update a book.
books.updateBook = async (req, res) => {
  const { book_id } = req.params;
  const { name, author, price } = req.body;

  const [result] = await (
    await connection
  ).query(
    "UPDATE books SET name = ?, author = ?, price = ? WHERE book_id = ?",
    [name, author, price, book_id]
  );

  if (result.affectedRows) {
    res.status(200).json({ status: 200, message: "book updated successfully" });
  } else {
    res.status(404).json({ status: 404, message: "book not found" });
  }
};

// delete a book.
books.deleteBook = async (req, res) => {
  const { book_id } = req.params;

  const [result] = await (
    await connection
  ).query("DELETE FROM books WHERE book_id = ?", [book_id]);

  await (
    await connection
  ).query("DELETE FROM book_collections WHERE book_id = ?", [book_id]);

  if (result.affectedRows) {
    res.status(204).send();
  } else {
    res.status(404).json({ status: 404, message: "book not found" });
  }
};

module.exports = books;
