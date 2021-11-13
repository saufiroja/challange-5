require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/user.router");
const dashboardRouter = require("./routes/dashboard.controller");
const errorHandler = require("./error/Error.Handler");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// konfigurasi ejs
app.set("view engine", "ejs");

// router
app.use(userRouter);
app.use(dashboardRouter);

// error handler
app.use(errorHandler);
// // error handling
// app.use((err, req, res, next) => {
//   console.log(err);
//   const { message, code = 500, error = "internal server error" } = err;

//   return res.status(code).json({
//     message,
//     code,
//     error,
//   });
// });

// listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`connect on port http://localhost:${PORT}`);
});
