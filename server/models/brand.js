'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product_Brand.hasMany(models.Product, {
        foreignKey: 'brand_id'
      });
    }
  }
  Product_Brand.init({
    brand_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    brand_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product_Brand',
    freezeTableName: true,
    timestamps: false
  });
  return Product_Brand;
};