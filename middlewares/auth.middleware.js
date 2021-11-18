// secret jwt
const { SECRET } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// authorized
exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
        console.log("gagal verifikasi");
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
