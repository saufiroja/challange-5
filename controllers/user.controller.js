require("dotenv").config();

// secret jwt
const { SECRET } = process.env;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Role } = require("../models");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password, roleName } = req.body;

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
    console.log(error.message);
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

    await bcrypt.compare(password, exist.password);

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
    console.log(error.message);
  }
};
