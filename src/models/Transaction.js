// src/models/Transaction.js - Verify field definitions
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
    },
    // Interest fields
    applyInterest: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'apply_interest',
      allowNull: false // Ensure this is not null
    },
    interestType: {
      type: DataTypes.ENUM('simple', 'compound', 'none'),
      defaultValue: 'none',
      field: 'interest_type',
      allowNull: false // Ensure this is not null
    },
    interestRate: {
      type: DataTypes.DECIMAL(5, 2),
      field: 'interest_rate'
    },
    compoundFrequency: {
      type: DataTypes.INTEGER,
      field: 'compound_frequency'
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
    ],
    // Add hooks to debug data being passed to the model
    hooks: {
      beforeCreate: (transaction, options) => {
        console.log('Transaction before create values:', {
          applyInterest: transaction.applyInterest,
          interestType: transaction.interestType,
          interestRate: transaction.interestRate,
          compoundFrequency: transaction.compoundFrequency
        });
      },
      afterCreate: (transaction, options) => {
        console.log('Transaction after create values:', {
          applyInterest: transaction.applyInterest,
          interestType: transaction.interestType,
          interestRate: transaction.interestRate,
          compoundFrequency: transaction.compoundFrequency
        });
      }
    }
  });

  return Transaction;
};