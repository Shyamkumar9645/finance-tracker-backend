'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Instead of searching for the person, let's create a person directly
      console.log('Creating person "chinni"...');

      // First check if the person already exists to avoid duplicates
      const existingPerson = await queryInterface.sequelize.query(
        "SELECT id FROM people WHERE name = 'chinni' LIMIT 1",
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
          name: 'chinni',
          created_at: new Date(),
          updated_at: new Date()
        }], { returning: true });

        // If returning: true doesn't work in your setup, we need to query to get the ID
        if (newPerson && newPerson[0] && newPerson[0].id) {
          personId = newPerson[0].id;
        } else {
          // Get the ID by querying for the newly created person
          const justCreatedPerson = await queryInterface.sequelize.query(
            "SELECT id FROM people WHERE name = 'chinni' LIMIT 1",
            { type: queryInterface.sequelize.QueryTypes.SELECT }
          );
          personId = justCreatedPerson[0].id;
        }
        console.log(`Created new person with ID: ${personId}`);
      }

      // All transactions are for chinni
      const chinniTransactions = [
        {
            user_id: 1,
            person_id: personId,
            amount: 10000.00,
            is_money_received: true,
            transaction_date: '2025-05-18',
            description: 'Out of 40000 Rupees, Chinni has given 30000. Pending 10k.',
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
            transaction_date: '2024-12-12',
            description: 'Received via UPI',
            payment_method: 'UPI',
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
            transaction_date: '2024-06-19',
            description: 'Received via PhonePe',
            payment_method: 'UPI',
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
            transaction_date: '2022-05-04',
            description: 'Received via UPI',
            payment_method: 'UPI',
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
      for (const transaction of chinniTransactions) {
        const exists = await checkTransaction(transaction);
        if (!exists) {
          await queryInterface.bulkInsert('transactions', [transaction]);
          insertedCount++;
        } else {
          skippedCount++;
        }
      }

      console.log(`Inserted ${insertedCount} transactions for chinni, skipped ${skippedCount} existing transactions.`);
      return Promise.resolve();

    } catch (error) {
      console.error('Error in seeder:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Get chinni's ID
      const chinni = await queryInterface.sequelize.query(
        `SELECT id FROM people WHERE name = 'chinni' LIMIT 1`,
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (!chinni || chinni.length === 0) {
        console.log("chinni not found, nothing to delete");
        return Promise.resolve();
      }

      const personId = chinni[0].id;

      // Delete transactions for chinni
      const deleteResult = await queryInterface.bulkDelete('transactions', {
        person_id: personId
      });

      console.log(`Deleted ${deleteResult} transactions for chinni`);
      return Promise.resolve();
    } catch (error) {
      console.error('Error in down method:', error);
      throw error;
    }
  }
};