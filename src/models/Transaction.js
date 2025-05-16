'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // Define associations
      Transaction.belongsTo(models.User, { foreignKey: 'userId' });
      Transaction.belongsTo(models.Person, { foreignKey: 'personId' });
    }
  }

  Transaction.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'person_id',
      references: {
        model: 'People',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.01
      }
    },
    isMoneyReceived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_money_received'
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'transaction_date'
    },
    description: DataTypes.TEXT,
    category: DataTypes.STRING(100),
    paymentMethod: {
      type: DataTypes.STRING(100),
      field: 'payment_method'
    },
    isSettled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_settled'
    },
    reminderDate: {
      type: DataTypes.DATE,
      field: 'reminder_date'
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    underscored: true,
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['person_id']
      },
      {
        fields: ['transaction_date']
      }
    ]
  });

  return Transaction;
};

