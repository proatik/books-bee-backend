/***
 * Title : Collections Controller.
 * Author : Atik Ullah Khan.
 * Description : CRUD operations on collections table.
 * Date : 14/08/2023.
 ***/

// database connection instance.
const { connection } = require("../configs/database");

// module scaffolding.
const collections = {};

// create a collection.
collections.getCollections = async (_req, res) => {
  const [collections] = await (
    await connection
  ).query(`SELECT * FROM collections`);

  res.status(200).json({ status: 200, collections });
};

// get books of a collection.
collections.getBookList = async (req, res) => {
  const { collection_id } = req.params;

  let query = `
      SELECT b.book_id, b.name, b.author, b.price, c.name AS collection_name
      FROM books AS b
      JOIN book_collections AS bc ON b.book_id = bc.book_id
      JOIN collections AS c ON bc.collection_id = c.collection_id
      WHERE bc.collection_id = ?
    `;

  const [books] = await (await connection).query(query, [collection_id]);

  res.status(200).json({ status: 200, books });
};

// create a new collection.
collections.createCollection = async (req, res) => {
  const { name } = req.body;

  const [collections] = await (
    await connection
  ).query(`SELECT * FROM collections WHERE name = ?`, [name]);

  if (collections.length) {
    res
      .status(409)
      .json({ status: 409, message: "this collection already exist" });
  } else {
    const [result] = await (
      await connection
    ).query("INSERT INTO collections (name) VALUES (?)", [name]);

    const collection = {
      name,
      collection_id: result.insertId,
    };

    res.status(201).json({ status: 201, collection });
  }
};

// add abook to collection.
collections.addBook = async (req, res) => {
  const { book_id, collection_id } = req.body;

  const [books] = await (
    await connection
  ).query(
    "SELECT * FROM book_collections WHERE collection_id = ? AND book_id = ?",
    [collection_id, book_id]
  );

  if (books.length) {
    res
      .status(409)
      .json({ status: 409, message: "book already exists in this collection" });
  } else {
    const [result] = await (
      await connection
    ).query(
      "INSERT INTO book_collections (collection_id, book_id) VALUES (?, ?)",
      [collection_id, book_id]
    );

    res.status(200).json({
      status: 200,
      message: "book successfully added to the collection",
    });
  }
};

// remove a book from collection.
collections.removeBook = async (req, res) => {
  const { book_id, collection_id } = req.body;

  const [result] = await (
    await connection
  ).query(
    "DELETE FROM book_collections WHERE collection_id = ? AND book_id = ?",
    [collection_id, book_id]
  );

  if (result.affectedRows) {
    res.status(200).json({
      status: 200,
      message: "book successfully removed from the collection",
    });
  }
};

module.exports = collections;
