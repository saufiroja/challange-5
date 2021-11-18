exports.room = async (req, res) => {
  const { user } = req;
  return res.status(200).json({
    code: 200,
    message: "success verify user",
    data: {
      username: user.username,
      email: user.email,
    },
  });
};
