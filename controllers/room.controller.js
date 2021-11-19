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
    const { name } = req.body;

    if (!user) {
      throw {
        message: "invalid token",
      };
    }

    let room = await Room.findOne({
      where: {
        name,
      },
    });

    const flag = `ROOM-${Date.now()}`;

    if (!room) {
      room = await Room.create({
        name,
        flag,
      });
    }

    return res.status(200).json({
      flag: room.flag,
    });
  } catch (error) {
    next(error);
  }
};
