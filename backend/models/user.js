"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.Role, {
        foreignKey: "role_id",
      });
      user.hasMany(models.orderMenu, {
        foreignKey: "user_id",
      });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      user_image: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.ENUM('Enable', 'Disable'),
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
