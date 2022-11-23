'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store_Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store_Account.hasMany(models.Store, {
        foreignKey: 'account_id'
      });
    }
  }
  Store_Account.init({
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    account_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store_Account',
    freezeTableName: true,
    timestamps: false
  });
  return Store_Account;
};