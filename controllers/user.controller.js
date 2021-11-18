require("dotenv").config();

// secret jwt
const { SECRET } = process.env;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Role } = require("../models");
const ApiError = require("../error/ErrorApi");

// GET REGISTER
exports.viewRegister = (req, res) => {
  return res.render("register");
};

exports.viewLogin = (req, res) => {
  return res.render("login");
};

// POST REGISTER
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, roleName } = req.body;

    // check user
    const exist = await User.findOne({
      where: {
        email,
      },
      attributes: ["id"],
    });

    if (exist) {
      next(ApiError.badRequest("user already exist"));
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 12);

    // create user
    const user = await User.create(
      {
        username,
        email,
        password: hashPassword,
        // pick role
        role: {
          name: roleName,
        },
      },
      {
        include: [
          {
            model: Role,
            as: "role",
          },
        ],
      }
    );

    return res.status(200).json({
      message: "success register user",
      code: 200,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
// POST LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({
      where: {
        email,
      },
      include: {
        model: Role,
        as: "role",
      },
    });

    if (!exist) {
      next(ApiError.badRequest("user not found"));
    }

    const match = await bcrypt.compare(password, exist.password);

    if (!match) {
      next(ApiError.badRequest("invalid password"));
    }

    const maxAge = 3 * 24 * 60 * 60;
    const token = jwt.sign(
      { user: exist.username, userId: exist.id, roleName: exist.role.name },
      SECRET,
      {
        expiresIn: maxAge,
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    // return res.status(200).redirect("/dashboard");
    return res.status(200).json({
      message: "success login",
      code: 200,
      userId: exist.id,
      roleName: exist.role.name,
      token,
    });
  } catch (error) {
    next(error);
  }
};
