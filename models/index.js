const User = require("./User.Model");
const Role = require("./Role.Model");

User.hasOne(Role, {
  as: "role",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Role.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  User,
  Role,
};
