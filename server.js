require("dotenv").config();
const http = require("http");
const app = require("./src/app");

const { port } = require("./src/configs/variables");
const { connectToDatabase } = require("./src/configs/database");

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server started ⚡");
  connectToDatabase();
});
