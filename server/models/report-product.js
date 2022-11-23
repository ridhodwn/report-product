'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Report_Product.belongsTo(models.Store, {
        foreignKey: 'store_id'
      });
      Report_Product.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }
  Report_Product.init({
    report_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    store_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    compliance: DataTypes.INTEGER,
    tanggal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Report_Product',
    freezeTableName: true,
    timestamps: false
  });
  return Report_Product;
};