const dotenv = require("dotenv");
dotenv.config("./.env");
const express = require("express");
const connection = require("./config/connection");

const app = express();

app.listen(process.env.PORT, () => {
  console.log("Server Started Successfuly");
});
