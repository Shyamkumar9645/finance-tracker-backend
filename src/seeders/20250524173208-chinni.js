'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Instead of searching for the person, let’s create a person directly
      console.log('Creating person "chinni"…');

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

      // All transactions are for chinni based on your handwritten notes
      const chinniTransactions = [
        {
          user_id: 1,
          person_id: personId,
          amount: 5000.00,
          is_money_received: false, // Money given to chinni
          transaction_date: '2025-09-04',
          description: 'Given via UPI',
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
          amount: 10000.00,
          is_money_received: false, // Money given to chinni
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
          is_money_received: false, // Money given to chinni
          transaction_date: '2024-12-12',
          description: 'Given via UPI',
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
          is_money_received: false, // Money given to chinni
          transaction_date: '2024-06-18',
          description: 'Given via PhonePe',
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
          is_money_received: false, // Money given to chinni
          transaction_date: '2022-05-04',
          description: 'Given via UPI',
          payment_method: 'UPI',
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
           AND transaction_date = :transactionDate
           AND is_money_received = :isMoneyReceived`,
          {
            replacements: {
              personId: transaction.person_id,
              amount: transaction.amount,
              transactionDate: transaction.transaction_date,
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
          console.log(`Inserted transaction: ${transaction.amount} on ${transaction.transaction_date}`);
        } else {
          skippedCount++;
          console.log(`Skipped duplicate transaction: ${transaction.amount} on ${transaction.transaction_date}`);
        }
      }

      console.log(`Summary: Inserted ${insertedCount} transactions for chinni, skipped ${skippedCount} existing transactions.`);
      console.log(`Total amount given to chinni: ${chinniTransactions.reduce((sum, t) => sum + t.amount, 0)}`);

      return Promise.resolve();

    } catch (error) {
      console.error('Error in seeder:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Get chinni’s ID
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

      console.log(`Deleted transactions for chinni (person_id: ${personId})`);

      // Optionally delete the person as well (uncomment if needed)
      // await queryInterface.bulkDelete('people', { id: personId });
      // console.log(`Deleted person chinni (id: ${personId})`);

      return Promise.resolve();
    } catch (error) {
      console.error('Error in down method:', error);
      throw error;
    }
  }
};