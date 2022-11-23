'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store_Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store_Area.hasMany(models.Store, {
        foreignKey: 'area_id'
      });
    }
  }
  Store_Area.init({
    area_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    area_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store_Area',
    freezeTableName: true,
    timestamps: false
  });
  return Store_Area;
};