/***
 * Title : Database connection.
 * Author : Atik Ullah Khan.
 * Description : Connect app to the MySQL database.
 * Date : 14/08/2023.
 ***/

const mysql = require("mysql2/promise"); // MySQL driver for node.js
const { host, user, password, database } = require("./variables");

const connection = mysql.createConnection({
  host,
  user,
  password,
  database,
});

// Create books, collections and book_collections tables if they don't exist.
const createTables = async () => {
  try {
    (await connection).query(
      `
          CREATE TABLE IF NOT EXISTS books (
            book_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            author VARCHAR(50) NOT NULL,
            price DECIMAL(10, 2) NOT NULL
          );
      `
    );

    (await connection).query(
      `
          CREATE TABLE IF NOT EXISTS collections (
            collection_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) UNIQUE NOT NULL
          );
      `
    );

    (await connection).query(
      `
          CREATE TABLE IF NOT EXISTS book_collections (
            book_id INT,
            collection_id INT,
            FOREIGN KEY (book_id) REFERENCES books (book_id),
            FOREIGN KEY (collection_id) REFERENCES collections (collection_id)
          );
      `
    );
  } catch (error) {
    console.error(error);
  }
};

// connect to the database.
const connectToDatabase = async () => {
  try {
    (await connection).connect();

    await Promise.resolve().then(() =>
      console.log("Connected to MySQL database 🚀")
    );

    await createTables();
  } catch (error) {
    console.log("Could not connect to the database 🐞");
  }
};

module.exports = { connection, connectToDatabase };
