'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.hasMany(models.Report_Product, {
        foreignKey: 'store_id'
      });
      Store.belongsTo(models.Store_Account, {
        foreignKey: 'account_id'
      });
      Store.belongsTo(models.Store_Area, {
        foreignKey: 'area_id'
      });
    }
  }
  Store.init({
    store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    store_name: DataTypes.STRING,
    account_id: DataTypes.INTEGER,
    area_id: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
    freezeTableName: true,
    timestamps: false
  });
  return Store;
};