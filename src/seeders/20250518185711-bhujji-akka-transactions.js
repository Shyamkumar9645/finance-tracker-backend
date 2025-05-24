'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Instead of searching for the person, let's create a person directly
      console.log('Creating person "Bhujji Akka"...');

      // First check if the person already exists to avoid duplicates
      const existingPerson = await queryInterface.sequelize.query(
        "SELECT id FROM people WHERE name = 'Bhujji Akka' LIMIT 1",
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
          name: 'Bhujji Akka',
          created_at: new Date(),
          updated_at: new Date()
        }], { returning: true });

        // If returning: true doesn't work in your setup, we need to query to get the ID
        if (newPerson && newPerson[0] && newPerson[0].id) {
          personId = newPerson[0].id;
        } else {
          // Get the ID by querying for the newly created person
          const justCreatedPerson = await queryInterface.sequelize.query(
            "SELECT id FROM people WHERE name = 'Bhujji Akka' LIMIT 1",
            { type: queryInterface.sequelize.QueryTypes.SELECT }
          );
          personId = justCreatedPerson[0].id;
        }
        console.log(`Created new person with ID: ${personId}`);
      }

      // All transactions are for Bhujji Akka
      const bhujjiAkkaTransactions = [
        // Image 5 transactions (2022-2023)
        {
          user_id: 1,
          person_id: personId,
          amount: 175090.00,
          is_money_received: false,
          transaction_date: '2022-10-15',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2022-10-16',
          description: 'Received from Bhujji Akka',
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
          amount: 700.00,
          is_money_received: false,
          transaction_date: '2022-10-16',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2022-10-17',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2022-11-06',
          description: 'Given to Bhujji Akka',
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
          is_money_received: false,
          transaction_date: '2022-11-10',
          description: 'Given to Bhujji Akka',
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
          amount: 5267.00,
          is_money_received: false,
          transaction_date: '2022-11-15',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2022-12-07',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2022-12-17',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2022-12-27',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2022-12-30',
          description: 'Given to Bhujji Akka - Roopa',
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
          amount: 20000.00,
          is_money_received: false,
          transaction_date: '2023-01-02',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2023-01-05',
          description: 'Given to Bhujji Akka',
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
          is_money_received: false,
          transaction_date: '2023-01-09',
          description: 'Given to Bhujji Akka',
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
            amount: 8000.00,
            is_money_received: false,
            transaction_date: '2023-01-10',
            description: 'Given to Bhujji Akka',
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
            transaction_date: '2023-01-15',
            description: 'Given to Bhujji Akka',
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
            transaction_date: '2023-01-17',
            description: 'Given to Bhujji Akka - Kisan',
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
            transaction_date: '2023-01-20',
            description: 'Given to Bhujji Akka - 2023',
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
            transaction_date: '2023-01-21',
            description: 'Given to Bhujji Akka - passport',
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
            amount: -9000.00,
            is_money_received: true,
            transaction_date: '2023-02-18',
            description: 'Received from Bhujji Akka (gaadi)',
            payment_method: 'Cash',
            is_settled: false,
            apply_interest: false,
            interest_type: 'simple',
            interest_rate: 0.00,
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            user_id: 1,
            person_id: personId,
            amount: 1000.00,
            is_money_received: false,
            transaction_date: '2023-02-19',
            description: 'Given to Bhujji Akka',
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
            transaction_date: '2023-04-06',
            description: 'Given to Bhujji Akka',
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
            amount: 1275.00,
            is_money_received: false,
            transaction_date: '2023-04-08',
            description: 'Given to Bhujji Akka',
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
            amount: 2850.00,
            is_money_received: false,
            transaction_date: '2023-04-09',
            description: 'Given to Bhujji Akka',
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
            amount: 34448.00,
            is_money_received: false,
            transaction_date: '2023-12-12',
            description: 'Given to Bhujji Akka (4448 + 30000)',
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
            transaction_date: '2023-12-30',
            description: 'Given to Bhujji Akka (5000 on Dec 25 + 5000 on Dec 30)',
            payment_method: 'Cash',
            is_settled: false,
            apply_interest: true,
            interest_type: 'simple',
            interest_rate: 24.00,
            created_at: new Date(),
            updated_at: new Date()
          },


        // Image 2 transactions (2024)
        {
          user_id: 1,
          person_id: personId,
          amount: 30000.00,
          is_money_received: false,
          transaction_date: '2024-01-01',
          description: 'Given to Bhujji Akka',
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
          amount: 25000.00,
          is_money_received: true,
          transaction_date: '2024-01-15',
          description: 'Received from Bhujji Akka',
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
          transaction_date: '2024-02-01',
          description: 'Given to Bhujji Akka - Hospital',
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
          transaction_date: '2024-02-02',
          description: 'Given to Bhujji Akka',
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
          transaction_date: '2024-02-02',
          description: 'Given to Bhujji Akka - Rita',
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
          amount: 7000.00,
          is_money_received: false,
          transaction_date: '2024-02-06',
          description: 'Given to Bhujji Akka - Raja',
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
          transaction_date: '2024-02-11',
          description: 'Given to Bhujji Akka - Rita',
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
          amount: 7000.00,
          is_money_received: false,
          transaction_date: '2024-03-10',
          description: 'Given to Bhujji Akka - Rita',
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
          amount: 6500.00,
          is_money_received: false,
          transaction_date: '2024-03-27',
          description: 'Given to Bhujji Akka - Rita',
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
          amount: 4650.00,
          is_money_received: false,
          transaction_date: '2024-04-13',
          description: 'Given to Bhujji Akka - Rita',
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
          transaction_date: '2024-04-14',
          description: 'Given to Bhujji Akka - Rita',
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
          amount: 1600.00,
          is_money_received: false,
          transaction_date: '2024-04-23',
          description: 'Given to Bhujji Akka - Raja',
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
          transaction_date: '2024-04-20',
          description: 'Given to Bhujji Akka - Raja',
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
          amount: 11000.00,
          is_money_received: true,
          transaction_date: '2024-04-24',
          description: 'Received from Bhujji Akka',
          payment_method: 'Cash',
          is_settled: false,
          apply_interest: true,
interest_type: 'simple',
interest_rate: 24.00,
          created_at: new Date(),
          updated_at: new Date()
        },
        // Image 3 transactions (2024)
                {
                  user_id: 1,
                  person_id: personId,
                  amount: 5000.00,
                  is_money_received: false,
                  transaction_date: '2024-08-07',
                  description: 'Given to Bhujji Akka - Cash',
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
                  transaction_date: '2024-08-19',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-08-28',
                  description: 'Given to Bhujji Akka - Raja bike',
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
                  amount: 6500.00,
                  is_money_received: false,
                  transaction_date: '2024-08-28',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-09-22',
                  description: 'Received from Bhujji Akka - Rita rent',
                  payment_method: 'Cash',
                  is_settled: false,
                  apply_interest: false,
                  interest_type: 'none',
                  created_at: new Date(),
                  updated_at: new Date()
                },
                {
                  user_id: 1,
                  person_id: personId,
                  amount: 900.00,
                  is_money_received: false,
                  transaction_date: '2024-09-15',
                  description: 'Given to Bhujji Akka - Rani Rani',
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
                  amount: 100.00,
                  is_money_received: false,
                  transaction_date: '2024-09-07',
                  description: 'Given to Bhujji Akka - Rita',
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
                  transaction_date: '2024-09-23',
                  description: 'Given to Bhujji Akka - Rita',
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
                  transaction_date: '2024-09-26',
                  description: 'Given to Bhujji Akka - Rita',
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
                  amount: 6500.00,
                  is_money_received: false,
                  transaction_date: '2024-09-27',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-09-27',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-09-30',
                  description: 'Given to Bhujji Akka',
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
                  amount: 53147.00,
                  is_money_received: false,
                  transaction_date: '2024-09-30',
                  description: 'Given to Bhujji Akka - iPhone paid',
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
                  transaction_date: '2024-10-01',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-10-04',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-10-05',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-10-08',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-10-27',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-10-28',
                  description: 'Given to Bhujji Akka',
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
                  transaction_date: '2024-11-07',
                  description: 'Given to Bhujji Akka',
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
                          is_money_received: false,
                          transaction_date: '2022-11-10',
                          description: 'Given to Bhujji Akka',
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
                          amount: 5267.00,
                          is_money_received: false,
                          transaction_date: '2022-11-15',
                          description: 'Given to Bhujji Akka',
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
                          transaction_date: '2022-12-07',
                          description: 'Given to Bhujji Akka',
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
                          transaction_date: '2022-12-17',
                          description: 'Given to Bhujji Akka',
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
                          transaction_date: '2022-12-27',
                          description: 'Given to Bhujji Akka',
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
                          transaction_date: '2022-12-30',
                          description: 'Given to Bhujji Akka - Roopa',
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
                          amount: 20000.00,
                          is_money_received: false,
                          transaction_date: '2023-01-02',
                          description: 'Given to Bhujji Akka',
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
                          transaction_date: '2023-01-05',
                          description: 'Given to Bhujji Akka',
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
                          is_money_received: false,
                          transaction_date: '2023-01-09',
                          description: 'Given to Bhujji Akka',
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
                      for (const transaction of bhujjiAkkaTransactions) {
                        const exists = await checkTransaction(transaction);
                        if (!exists) {
                          await queryInterface.bulkInsert('transactions', [transaction]);
                          insertedCount++;
                        } else {
                          skippedCount++;
                        }
                      }

                      console.log(`Inserted ${insertedCount} transactions for Bhujji Akka, skipped ${skippedCount} existing transactions.`);
                      return Promise.resolve();

                    } catch (error) {
                      console.error('Error in seeder:', error);
                      throw error;
                    }
                  },

                  down: async (queryInterface, Sequelize) => {
                    try {
                      // Get Bhujji Akka's ID
                      const bhujjiAkka = await queryInterface.sequelize.query(
                        `SELECT id FROM people WHERE name = 'Bhujji Akka' LIMIT 1`,
                        { type: queryInterface.sequelize.QueryTypes.SELECT }
                      );

                      if (!bhujjiAkka || bhujjiAkka.length === 0) {
                        console.log("Bhujji Akka not found, nothing to delete");
                        return Promise.resolve();
                      }

                      const personId = bhujjiAkka[0].id;

                      // Delete specific transactions for Bhujji Akka within date ranges
                      // This specifically targets transactions created by this seeder
                      const deleteResult = await queryInterface.bulkDelete('transactions', {
                        person_id: personId,
                        transaction_date: {
                          [Sequelize.Op.between]: ['2022-01-01', '2025-12-31']
                        }
                      });

                      console.log(`Deleted ${deleteResult} transactions for Bhujji Akka between 2022-2025`);
                      return Promise.resolve();
                    } catch (error) {
                      console.error('Error in down method:', error);
                      throw error;
                    }
                  }
                };
