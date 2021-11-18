const Room = require("../models/Room.Model");

exports.room = (req, res, next) => {
  try {
    const { user } = req;

    return res.status(200).json({
      code: 200,
      message: "success verify user",
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, flag } = req.body;

    if (user) {
      const roomCreate = await Room.create({
        name,
        flag,
      });

      return res.status(200).json({
        room: roomCreate.dataValues,
      });
    }
  } catch (error) {
    next(error);
  }
};
