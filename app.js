require("dotenv").config();

const express = require("express");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router

// listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`connect on port http://localhost:${PORT}`);
});
