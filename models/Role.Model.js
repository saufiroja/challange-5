const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.ENUM("PlayerUser", "SuperAdmin"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "roles",
    modelName: "roles",
  }
);

module.exports = Role;
