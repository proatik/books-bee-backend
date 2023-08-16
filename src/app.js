/***
 * Title : Main Application.
 * Author : Atik Ullah Khan.
 * Description : Application created using express.js framework.
 * Date : 14/08/2023.
 ***/

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const booksRouter = require("./routes/booksRouter");
const collectionRouter = require("./routes/collectionRouter");

app.use("/api/books", booksRouter);
app.use("/api/collections", collectionRouter);

app.use("*", (_req, res) => {
  res.status(404).json({ status: 404, message: "Resource not found!" });
});

app.use((_err, _req, res, _next) => {
  console.log(_err);
  res.status(500);
  res.json({
    status: 500,
    message: "Something went wrong. Please try again.",
  });
});

module.exports = app;
