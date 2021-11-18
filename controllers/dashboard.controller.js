exports.dashboard = async (req, res) => {
  const { user } = req;
  return res.render("dashboard", {
    username: user.username,
  });
};
