const ApiError = require("./ErrorApi");

const apiErrorHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }

  res.status(500).json("something wrong");
};

module.exports = apiErrorHandler;
