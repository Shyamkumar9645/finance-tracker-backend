'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Instead of searching for the person, let's create a person directly
      console.log('Creating person "Vinay"...');

      // First check if the person already exists to avoid duplicates
      const existingPerson = await queryInterface.sequelize.query(
        "SELECT id FROM people WHERE name = 'Vinay' LIMIT 1",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      let personId;

      if (existingPerson && existingPerson.length > 0) {
        // Person exists, use their ID
        personId = existingPerson[0].id;
        console.log(`Person already exists with ID: ${personId}`);
      } else {
        // Person doesn't exist, create them
        const newPerson = await queryInterface.bulkInsert('people', [{
          user_id: 1,
          name: 'Vinay',
          created_at: new Date(),
          updated_at: new Date()
        }], { returning: true });

        // If returning: true doesn't work in your setup, we need to query to get the ID
        if (newPerson && newPerson[0] && newPerson[0].id) {
          personId = newPerson[0].id;
        } else {
          // Get the ID by querying for the newly created person
          const justCreatedPerson = await queryInterface.sequelize.query(
            "SELECT id FROM people WHERE name = 'Vinay' LIMIT 1",
            { type: queryInterface.sequelize.QueryTypes.SELECT }
          );
          personId = justCreatedPerson[0].id;
        }
        console.log(`Created new person with ID: ${personId}`);
      }

      // All transactions are for Vinay
      const vinayTransactions = [
        // Image 1 transactions
        {
          user_id: 1,
          person_id: personId,
          amount: 5000.00,
          is_money_received: false,
          transaction_date: '2024-01-07',
          description: 'Given to Vinay',
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
          person_id: personId,
          amount: 10000.00,
          is_money_received: false,
          transaction_date: '2024-01-08',
          description: 'Boarding expenses',
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
          person_id: personId,
          amount: 500.00,
          is_money_received: false,
          transaction_date: '2024-01-09',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 500.00,
          is_money_received: false,
          transaction_date: '2024-01-09',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 1000.00,
          is_money_received: false,
          transaction_date: '2024-01-10',
          description: 'Given to Vinay for Vinay/Vineeth',
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
          person_id: personId,
          amount: 500.00,
          is_money_received: false,
          transaction_date: '2024-12-20',
          description: 'Given to Vinay',
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
          person_id: personId,
          amount: 5000.00,
          is_money_received: false,
          transaction_date: '2024-02-26',
          description: 'Given to Vinay (ICICI Mobile)',
          payment_method: 'Bank Transfer',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 700.00,
          is_money_received: false,
          transaction_date: '2024-03-23',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 1000.00,
          is_money_received: false,
          transaction_date: '2024-04-27',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 500.00,
          is_money_received: false,
          transaction_date: '2024-04-27',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 300.00,
          is_money_received: false,
          transaction_date: '2024-05-29',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 600.00,
          is_money_received: false,
          transaction_date: '2024-08-07',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 2000.00,
          is_money_received: false,
          transaction_date: '2024-08-15',
          description: 'Given to Vinay',
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
          person_id: personId,
          amount: 600.00,
          is_money_received: false,
          transaction_date: '2024-07-20',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 1000.00,
          is_money_received: false,
          transaction_date: '2024-08-29',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 500.00,
          is_money_received: false,
          transaction_date: '2024-09-10',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 5000.00,
          is_money_received: true,
          transaction_date: '2024-09-10',
          description: 'Received from Vinay',
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
          person_id: personId,
          amount: 962.00,
          is_money_received: false,
          transaction_date: '2024-09-25',
          description: 'Given to Vinay',
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
          person_id: personId,
          amount: 3000.00,
          is_money_received: false,
          transaction_date: '2024-10-10',
          description: 'Given to Vinay for Vineeth',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },

        // Image 2 transactions
        {
          user_id: 1,
          person_id: personId,
          amount: 500.00,
          is_money_received: false,
          transaction_date: '2024-09-30',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 1000.00,
          is_money_received: false,
          transaction_date: '2024-11-13',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 53733.00,
          is_money_received: false,
          transaction_date: '2024-11-05',
          description: 'Given to Vinay for Vineeth',
          payment_method: 'Bank Transfer',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 35000.00,
          is_money_received: true,
          transaction_date: '2024-11-05',
          description: 'Received from Vinay',
          payment_method: 'Bank Transfer',
          is_settled: false,
          apply_interest: true,
                  interest_type: 'simple',
                  interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 10000.00,
          is_money_received: true,
          transaction_date: '2024-11-10',
          description: 'Received from Vinay',
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
          person_id: personId,
          amount: 400.00,
          is_money_received: false,
          transaction_date: '2024-11-29',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 5000.00,
          is_money_received: false,
          transaction_date: '2024-12-21',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 10000.00,
          is_money_received: true,
          transaction_date: '2024-12-12',
          description: 'Received from Vinay',
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
          person_id: personId,
          amount: 4000.00,
          is_money_received: false,
          transaction_date: '2025-01-20',
          description: 'Given to Vinay',
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
          person_id: personId,
          amount: 2000.00,
          is_money_received: false,
          transaction_date: '2025-02-08',
          description: 'Given to Vinay',
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
          person_id: personId,
          amount: 500.00,
          is_money_received: false,
          transaction_date: '2025-01-02',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 1000.00,
          is_money_received: false,
          transaction_date: '2025-02-01',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 1000.00,
          is_money_received: false,
          transaction_date: '2025-03-03',
          description: 'Given to Vinay for Vineeth',
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
          person_id: personId,
          amount: 5000.00,
          is_money_received: true,
          transaction_date: '2025-03-03',
          description: 'Received from Vinay',
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
          person_id: personId,
          amount: 5000.00,
          is_money_received: false,
          transaction_date: '2025-05-18',
          description: 'Given to Vinay',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
          interest_type: 'simple',
          interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },

        // Image 3 transactions (Vinay 2022-2023)
        {
          user_id: 1,
          person_id: personId,
          amount: 58100.00,
          is_money_received: false,
          transaction_date: '2022-10-18',
          description: 'Loan Given',
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
          person_id: personId,
          amount: 2000.00,
          is_money_received: true,
          transaction_date: '2022-11-20',
          description: 'Amount Returned',
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
          person_id: personId,
          amount: 17000.00,
          is_money_received: true,
          transaction_date: '2023-02-08',
          description: 'Fees',
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
          person_id: personId,
          amount: 9000.00,
          is_money_received: true,
          transaction_date: '2023-02-12',
          description: 'Amount Returned',
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
          person_id: personId,
          amount: 3000.00,
          is_money_received: true,
          transaction_date: '2023-02-16',
          description: 'Amount Returned',
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
          person_id: personId,
          amount: 5000.00,
          is_money_received: true,
          transaction_date: '2023-03-25',
          description: 'Amount Returned',
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
          person_id: personId,
          amount: 3500.00,
          is_money_received: true,
          transaction_date: '2023-03-26',
          description: 'Amount Returned',
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
          person_id: personId,
          amount: 2500.00,
          is_money_received: true,
          transaction_date: '2023-03-31',
          description: 'Amount Returned',
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
          person_id: personId,
          amount: 16000.00,
          is_money_received: true,
          transaction_date: '2023-05-01',
          description: 'Fees',
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
          person_id: personId,
          amount: 10500.00,
          is_money_received: true,
          transaction_date: '2023-08-18',
          description: 'App Router',
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
          person_id: personId,
          amount: 1500.00,
          is_money_received: true,
          transaction_date: '2023-09-20',
          description: 'Amount Returned',
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
          person_id: personId,
          amount: 1500.00,
          is_money_received: true,
          transaction_date: '2023-10-10',
          description: 'Cash ChqPdBy',
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
          person_id: personId,
          amount: 2300.00,
          is_money_received: true,
          transaction_date: '2023-10-20',
          description: 'Fishnet',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
                  interest_type: 'simple',
                  interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];

      // Check if transactions already exist to avoid duplicates
      const checkTransaction = async (transaction) => {
        const existingTransaction = await queryInterface.sequelize.query(
          `SELECT COUNT(*) as count FROM transactions
           WHERE person_id = :personId
           AND amount = :amount
           AND is_money_received = :isMoneyReceived
           AND transaction_date::date = :transactionDate::date`,
          {
            replacements: {
              personId: transaction.person_id,
              amount: transaction.amount,
              isMoneyReceived: transaction.is_money_received,
              transactionDate: transaction.transaction_date
            },
            type: queryInterface.sequelize.QueryTypes.SELECT
          }
        );

        return existingTransaction[0].count > 0;
      };

      let insertedCount = 0;
      let skippedCount = 0;

      // Insert transactions one by one, checking for duplicates
      for (const transaction of vinayTransactions) {
        const exists = await checkTransaction(transaction);
        if (!exists) {
          await queryInterface.bulkInsert('transactions', [transaction]);
          insertedCount++;
        } else {
          skippedCount++;
        }
      }

      console.log(`Inserted ${insertedCount} transactions for Vinay, skipped ${skippedCount} existing transactions.`);
      return Promise.resolve();

    } catch (error) {
      console.error('Error in seeder:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Get Vinay's ID
      const vinay = await queryInterface.sequelize.query(
        `SELECT id FROM people WHERE name = 'Vinay' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (!vinay || vinay.length === 0) {
        console.log("Vinay not found, nothing to delete");
        return Promise.resolve();
      }

      const personId = vinay[0].id;

      // Delete specific transactions for Vinay within date ranges
      // This specifically targets transactions created by this seeder
      const deleteResult = await queryInterface.bulkDelete('transactions', {
        person_id: personId,
        transaction_date: {
          [Sequelize.Op.between]: ['2022-01-01', '2025-12-31']
        }
      });

      console.log(`Deleted ${deleteResult} transactions for Vinay between 2022-2025`);
      return Promise.resolve();
    } catch (error) {
      console.error('Error in down method:', error);
      throw error;
    }
  }
};