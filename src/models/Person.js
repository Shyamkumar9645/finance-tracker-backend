'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      // Define associations
      Person.belongsTo(models.User, { foreignKey: 'userId' });
      Person.hasMany(models.Transaction, { foreignKey: 'personId' });
    }
  }

  Person.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      validate: {
        isEmail: true
      }
    },
    phone: DataTypes.STRING(50),
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Person',
    tableName: 'people',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'name']
      }
    ]
  });

  return Person;
};