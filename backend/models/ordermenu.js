"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderMenu.belongsTo(models.product, {
        foreignKey: "product_id",
      });
      orderMenu.belongsTo(models.user, {
        foreignKey: "user_id",
      });
    }
  }
  orderMenu.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "orderMenu",
    }
  );
  return orderMenu;
};