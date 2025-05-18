'use strict';

// This is a corrected migration file that ensures proper column types
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, check if the columns already exist to avoid errors
    const tableInfo = await queryInterface.describeTable('transactions');

    const columnsToAdd = [];

    if (!tableInfo.apply_interest) {
      columnsToAdd.push(
        queryInterface.addColumn('transactions', 'apply_interest', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
          field: 'apply_interest'
        })
      );
    }

    if (!tableInfo.interest_type) {
      // First create the ENUM type if it doesn't exist
      await queryInterface.sequelize.query(
        `DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_transactions_interest_type') THEN
                CREATE TYPE "enum_transactions_interest_type" AS ENUM ('simple', 'compound', 'none');
            END IF;
        END$$;`
      );

      columnsToAdd.push(
        queryInterface.addColumn('transactions', 'interest_type', {
          type: Sequelize.ENUM('simple', 'compound', 'none'),
          defaultValue: 'none',
          field: 'interest_type'
        })
      );
    }

    if (!tableInfo.interest_rate) {
      columnsToAdd.push(
        queryInterface.addColumn('transactions', 'interest_rate', {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: true,
          field: 'interest_rate',
          comment: 'Annual interest rate in percentage'
        })
      );
    }

    if (!tableInfo.compound_frequency) {
      columnsToAdd.push(
        queryInterface.addColumn('transactions', 'compound_frequency', {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: 'compound_frequency',
          comment: 'Number of times interest compounds per year (12=monthly, 4=quarterly, 1=annually)'
        })
      );
    }

    // Execute all column additions in parallel
    if (columnsToAdd.length > 0) {
      await Promise.all(columnsToAdd);
      console.log('Added interest columns to transactions table successfully');
    } else {
      console.log('Interest columns already exist in transactions table');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns in reverse order
    await queryInterface.removeColumn('transactions', 'compound_frequency');
    await queryInterface.removeColumn('transactions', 'interest_rate');
    await queryInterface.removeColumn('transactions', 'interest_type');
    await queryInterface.removeColumn('transactions', 'apply_interest');

    // Drop the enum type
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_transactions_interest_type";');
  }
};