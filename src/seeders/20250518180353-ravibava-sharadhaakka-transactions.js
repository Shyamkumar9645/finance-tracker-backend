'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Instead of searching for the person, let's create a person directly
      console.log('Creating person "Ravi Bava- Sharadha akka"...');

      // First check if the person already exists to avoid duplicates
      const existingPerson = await queryInterface.sequelize.query(
        "SELECT id FROM people WHERE name = 'Ravi Bava- Sharadha akka' LIMIT 1",
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
          name: 'Ravi Bava- Sharadha akka',
          created_at: new Date(),
          updated_at: new Date()
        }], { returning: true });

        // If returning: true doesn't work in your setup, we need to query to get the ID
        if (newPerson && newPerson[0] && newPerson[0].id) {
          personId = newPerson[0].id;
        } else {
          // Get the ID by querying for the newly created person
          const justCreatedPerson = await queryInterface.sequelize.query(
            "SELECT id FROM people WHERE name = 'Ravi Bava- Sharadha akka' LIMIT 1",
            { type: queryInterface.sequelize.QueryTypes.SELECT }
          );
          personId = justCreatedPerson[0].id;
        }
        console.log(`Created new person with ID: ${personId}`);
      }

      // Define transactions with the proper person_id
      const transactions = [
        {
          user_id: 1,
          person_id: personId,
          amount: 18000.00,
          is_money_received: false,
          transaction_date: '2022-10-15 00:00:00+00',
          description: 'Loan Given',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 1100.00,
          is_money_received: false,
          transaction_date: '2022-10-16 00:00:00+00',
          description: 'Marriage Amount (Sunday)',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 2200.00,
          is_money_received: false,
          transaction_date: '2022-10-16 00:00:00+00',
          description: 'Train Tickets',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 25000.00,
          is_money_received: false,
          transaction_date: '2023-09-14 00:00:00+00',
          description: 'Loan Given',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 50000.00,
          is_money_received: true,
          transaction_date: '2023-09-14 00:00:00+00',
          description: 'Amount Returned',
          payment_method: 'Cash',
          is_settled: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 20000.00,
          is_money_received: false,
          transaction_date: '2024-01-01 00:00:00+00',
          description: 'Loan Given',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 100000.00,
          is_money_received: false,
          transaction_date: '2024-01-18 00:00:00+00',
          description: 'Loan Given',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 19000.00,
          is_money_received: false,
          transaction_date: '2024-11-10 00:00:00+00',
          description: 'Loan Given',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 10000.00,
          is_money_received: false,
          transaction_date: '2024-11-11 00:00:00+00',
          description: 'Net amount from 50000-40000',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 7543.00,
          is_money_received: false,
          transaction_date: '2024-11-10 00:00:00+00',
          description: 'Credit Card Vamshi',
          payment_method: 'Credit Card',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 10500.00,
          is_money_received: false,
          transaction_date: '2025-01-28 00:00:00+00',
          description: 'Vamshi Monitor',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 2190.00,
          is_money_received: false,
          transaction_date: '2025-01-29 00:00:00+00',
          description: 'Computer Own -> Life Style',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 1350.00,
          is_money_received: false,
          transaction_date: '2025-01-30 00:00:00+00',
          description: 'Sour Cake (2500-1150)',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          user_id: 1,
          person_id: personId,
          amount: 14000.00,
          is_money_received: false,
          transaction_date: '2025-04-01 00:00:00+00',
          description: 'Bhadra Singh Ann',
          payment_method: 'Cash',
          is_settled: false,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];

      console.log(`Inserting ${transactions.length} transactions`);
      return queryInterface.bulkInsert('transactions', transactions);
    } catch (error) {
      console.error('Error in seeder:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Get the person ID
      const person = await queryInterface.sequelize.query(
        "SELECT id FROM people WHERE name = 'Ravi Bava- Sharadha akka' LIMIT 1",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (person && person.length > 0) {
        const personId = person[0].id;
        console.log(`Deleting transactions for person ID: ${personId}`);

        // Delete transactions for this person
        return queryInterface.bulkDelete('transactions', {
          person_id: personId
        });
      } else {
        console.log('Person not found, nothing to delete');
        return Promise.resolve();
      }
    } catch (error) {
      console.error('Error in down method:', error);
      throw error;
    }
  }
};