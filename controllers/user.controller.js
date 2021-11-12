require("dotenv").config();

// secret jwt
const { SECRET } = process.env;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Role } = require("../models");
const { register } = require("../schema/register.schema");

// // error handling
// const errorHandling = (err) => {
//   console.log(err.msg, err.code);
//   let errors = { username: "", email: "", password: "" };

//   // incorrect username
//   if (err.message === "incorrect username") {
//     errors.message = "thats username is not registered";
//     return errors;
//   }

//   // incorrect email
//   if (err.message === "incorrect email") {
//     errors.message = "thats email is not registered";
//     return errors;
//   }

//   // incorrect password
//   if (err.message === "incorrect password") {
//     errors.message = "thats password is incorrect";
//     return errors;
//   }

//   // duplicate code
//   if (err.code === 11000) {
//     errors.message = "thats email is already registered";
//     return errors;
//   }
// };

// REGISTER
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
      throw {
        message: `user already registered`,
        code: 400,
        error: `bad request`,
      };
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await User.create(
      {
        username,
        email,
        password: hashPassword,
        //pick role
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

    return res.status(201).json({
      message: "success register user",
      code: 201,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res) => {
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
      throw {
        message: `User not found`,
        code: 404,
        error: `bad request`,
      };
    }

    const match = await bcrypt.compare(password, exist.password);

    if (!match) {
      throw {
        message: `invalid password`,
        code: 404,
        error: `bad request`,
      };
    }

    const token = jwt.sign(
      { userId: exist.id, roleName: exist.role.name },
      SECRET,
      {
        expiresIn: "7 days",
      }
    );

    return res.status(200).json({
      message: "success login",
      code: 200,
      data: token,
    });
  } catch (error) {
    next(error);
  }
};
