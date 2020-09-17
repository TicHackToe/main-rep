'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Square extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Square.init({
    BoardId: DataTypes.INTEGER,
    PlayerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Square',
  });
  return Square;
};