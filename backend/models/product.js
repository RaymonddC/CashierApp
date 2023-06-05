"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.category, {
        foreignKey: "category_id",
      });
    }
  }
  product.init(
    {
      product_name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      product_image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
