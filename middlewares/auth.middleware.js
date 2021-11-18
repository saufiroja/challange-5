// secret jwt
const { SECRET } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// authorized
exports.requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw {
        code: 401,
        message: "invalid token",
        error: "unauthorized",
      };
    }

    const validToken = jwt.verify(token, SECRET, {});

    if (!validToken) {
      throw {
        code: 401,
        message: "invalid token",
        error: "unauthorized",
      };
    }

    const user = await User.findOne({
      where: {
        id: validToken.userId,
      },
    });

    if (!user) {
      throw {
        code: 401,
        message: "invalid token",
        error: "unauthorized",
      };
    }

    req.user = user.dataValues;
    next();
  } catch (error) {
    next(error);
  }
};
