const express = require("express");
require("dotenv").config();
const dbConnect = require("./utils/dbConnect.cjs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect()

app
  .listen(process.env.PORT, () => {
    console.log(`server is working on Port:${process.env.PORT}`);
  })
  .catch(console.log("failed to connect to server"));
