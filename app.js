require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/user.router");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use(userRouter);

// listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`connect on port http://localhost:${PORT}`);
});
