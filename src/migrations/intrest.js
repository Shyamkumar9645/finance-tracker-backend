'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'apply_interest', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      field: 'apply_interest'
    });

    await queryInterface.addColumn('transactions', 'interest_type', {
      type: Sequelize.ENUM('simple', 'compound', 'none'),
      defaultValue: 'none',
      field: 'interest_type'
    });

    await queryInterface.addColumn('transactions', 'interest_rate', {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
      field: 'interest_rate',
      comment: 'Annual interest rate in percentage'
    });

    await queryInterface.addColumn('transactions', 'compound_frequency', {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'compound_frequency',
      comment: 'Number of times interest compounds per year (12=monthly, 4=quarterly, 1=annually)'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('transactions', 'apply_interest');
    await queryInterface.removeColumn('transactions', 'interest_type');
    await queryInterface.removeColumn('transactions', 'interest_rate');
    await queryInterface.removeColumn('transactions', 'compound_frequency');
  }
};