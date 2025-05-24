'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Get the ID of Srinu, since person is already in database
      const srinu = await queryInterface.sequelize.query(
        `SELECT id FROM people WHERE name = 'Srinu' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (!srinu || srinu.length === 0) {
        throw new Error("Person 'Srinu' not found in database. Please make sure Srinu exists in the database first.");
      }

      const srinuId = srinu[0].id;
      console.log(`Found Srinu with ID: ${srinuId}`);

      // All transactions are for Srinu
      const srinuTransactions = [
        {
          user_id: 1,
          person_id: srinuId,
          amount: 100000.00,
          is_money_received: false,
          transaction_date: new Date(), // Current date as no specific date mentioned
          description: 'Given to Srinu (1 lakh) - Personal Loan (1.5 lakhs)',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 35000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 5000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 2000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 10000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 50000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu - Towards bad (4 lakh) to Kirran',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 1069702.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Transferred to Srinu',
          payment_method: 'Bank Transfer',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        // Total noted as 1469702 but this appears to be a summation, not a transaction
        {
          user_id: 1,
          person_id: srinuId,
          amount: 10000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 10000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 6500.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu - Rita Rent',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 7500.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 6500.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu - Rita Rent',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 1000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: srinuId,
          amount: 4000.00,
          is_money_received: false,
          transaction_date: new Date(),
          description: 'Given to Srinu',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        // The last entry appears to be a calculation or summary (500+6500+1000+100+500), not a transaction
      ];

      // Check if transactions already exist to avoid duplicates
      const checkTransaction = async (transaction) => {
        const existingTransaction = await queryInterface.sequelize.query(
          `SELECT COUNT(*) as count FROM transactions
           WHERE person_id = :personId
           AND amount = :amount
           AND is_money_received = :isMoneyReceived`,
          {
            replacements: {
              personId: transaction.person_id,
              amount: transaction.amount,
              isMoneyReceived: transaction.is_money_received
            },
            type: queryInterface.sequelize.QueryTypes.SELECT
          }
        );

        return existingTransaction[0].count > 0;
      };

      let insertedCount = 0;
      let skippedCount = 0;

      // Insert transactions one by one, checking for duplicates
      for (const transaction of srinuTransactions) {
        const exists = await checkTransaction(transaction);
        if (!exists) {
          await queryInterface.bulkInsert('transactions', [transaction]);
          insertedCount++;
        } else {
          skippedCount++;
        }
      }

      console.log(`Inserted ${insertedCount} transactions for Srinu, skipped ${skippedCount} existing transactions.`);
      return Promise.resolve();

    } catch (error) {
      console.error('Error in seeder:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Get Srinu's ID
      const srinu = await queryInterface.sequelize.query(
        `SELECT id FROM people WHERE name = 'Srinu' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (!srinu || srinu.length === 0) {
        console.log("Srinu not found, nothing to delete");
        return Promise.resolve();
      }

      const srinuId = srinu[0].id;

      // Delete transactions for Srinu
      const deleteResult = await queryInterface.bulkDelete('transactions', {
        person_id: srinuId
      });

      console.log(`Deleted ${deleteResult} transactions for Srinu`);
      return Promise.resolve();
    } catch (error) {
      console.error('Error in down method:', error);
      throw error;
    }
  }
};