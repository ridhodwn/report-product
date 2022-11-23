'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Report_Product, {
        foreignKey: 'product_id'
      });
      Product.belongsTo(models.Product_Brand, {
        foreignKey: 'brand_id'
      });
    }
  }
  Product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    product_name: DataTypes.STRING,
    brand_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    freezeTableName: true,
    timestamps: false
  });
  return Product;
};