const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

class Role extends Model {}

Role.init(
  {
    role: {
      type: DataTypes.ENUM("PlayerUser", "SuperAdmin"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "roles",
    modelName: "Role",
  }
);

module.exports = Role;
