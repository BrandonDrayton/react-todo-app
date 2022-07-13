'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  }
  Todo.init({
    text: DataTypes.STRING,
    priority: DataTypes.STRING,
    color: DataTypes.STRING(6)
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};