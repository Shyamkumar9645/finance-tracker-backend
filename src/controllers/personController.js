// src/controllers/personController.js
const { Person, Transaction, sequelize } = require('../models');
const { Op } = require('sequelize');

// Create a new person
exports.createPerson = async (req, res) => {
  try {
    const { name, email, phone, notes } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Check if person with the same name already exists for this user
    const existingPerson = await Person.findOne({
      where: {
        userId,
        name
      }
    });

    if (existingPerson) {
      return res.status(400).json({ error: 'A person with this name already exists' });
    }

    // Create person
    const person = await Person.create({
      userId,
      name,
      email,
      phone,
      notes
    });

    res.status(201).json({
      message: 'Person created successfully',
      person
    });
  } catch (error) {
    console.error('Create person error:', error);
    res.status(500).json({ error: 'Failed to create person. Please try again.' });
  }
};

// Get all people for the current user
exports.getPeople = async (req, res) => {
  try {
    const userId = req.user.id;
    const { search, sortBy = 'name', sortOrder = 'ASC' } = req.query;

    // Build where clause
    const whereClause = { userId };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } },
        { notes: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Get people
    const people = await Person.findAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      attributes: {
        include: [
          // Include calculated balances for each person
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM(CASE WHEN "is_money_received" = true THEN "amount" ELSE -"amount" END), 0)
              FROM transactions
              WHERE "person_id" = "Person"."id"
            )`),
            'balance'
          ]
        ]
      }
    });

    res.status(200).json({ people });
  } catch (error) {
    console.error('Get people error:', error);
    res.status(500).json({ error: 'Failed to retrieve people' });
  }
};

// Get a specific person
exports.getPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const person = await Person.findOne({
      where: {
        id,
        userId
      },
      attributes: {
        include: [
          // Include calculated balance for this person
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM(CASE WHEN "is_money_received" = true THEN "amount" ELSE -"amount" END), 0)
              FROM transactions
              WHERE "person_id" = "Person"."id"
            )`),
            'balance'
          ],
          // Include total money received from this person
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM("amount"), 0)
              FROM transactions
              WHERE "person_id" = "Person"."id" AND "is_money_received" = true
            )`),
            'totalReceived'
          ],
          // Include total money given to this person
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM("amount"), 0)
              FROM transactions
              WHERE "person_id" = "Person"."id" AND "is_money_received" = false
            )`),
            'totalGiven'
          ]
        ]
      }
    });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Get recent transactions with this person
    const recentTransactions = await Transaction.findAll({
      where: {
        userId,
        personId: id
      },
      order: [['transactionDate', 'DESC']],
      limit: 5
    });

    res.status(200).json({
      person,
      recentTransactions
    });
  } catch (error) {
    console.error('Get person error:', error);
    res.status(500).json({ error: 'Failed to retrieve person details' });
  }
};

// Update a person
exports.updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, email, phone, notes } = req.body;

    // Find the person
    const person = await Person.findOne({
      where: {
        id,
        userId
      }
    });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // If changing the name, check if another person with that name exists
    if (name && name !== person.name) {
      const existingPerson = await Person.findOne({
        where: {
          userId,
          name,
          id: {
            [Op.ne]: id
          }
        }
      });

      if (existingPerson) {
        return res.status(400).json({ error: 'A person with this name already exists' });
      }
    }

    // Update person
    await person.update({
      name: name || person.name,
      email: email !== undefined ? email : person.email,
      phone: phone !== undefined ? phone : person.phone,
      notes: notes !== undefined ? notes : person.notes
    });

    res.status(200).json({
      message: 'Person updated successfully',
      person
    });
  } catch (error) {
    console.error('Update person error:', error);
    res.status(500).json({ error: 'Failed to update person. Please try again.' });
  }
};

// Delete a person
exports.deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const person = await Person.findOne({
      where: {
        id,
        userId
      }
    });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Check if person has transactions
    const transactionCount = await Transaction.count({
      where: {
        userId,
        personId: id
      }
    });

    if (transactionCount > 0) {
      return res.status(400).json({
        error: 'Cannot delete a person with associated transactions',
        transactionCount
      });
    }

    await person.destroy();

    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Delete person error:', error);
    res.status(500).json({ error: 'Failed to delete person. Please try again.' });
  }
};

// Get all transactions for a specific person
exports.getPersonTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { sortBy = 'transactionDate', sortOrder = 'DESC' } = req.query;

    // Verify that person exists and belongs to the user
    const person = await Person.findOne({
      where: {
        id,
        userId
      }
    });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Get transactions
    const transactions = await Transaction.findAll({
      where: {
        userId,
        personId: id
      },
      order: [[sortBy, sortOrder]]
    });

    // Calculate summary
    let totalReceived = 0;
    let totalGiven = 0;

    transactions.forEach(transaction => {
      if (transaction.isMoneyReceived) {
        totalReceived += parseFloat(transaction.amount);
      } else {
        totalGiven += parseFloat(transaction.amount);
      }
    });

    const balance = totalReceived - totalGiven;

    res.status(200).json({
      person: {
        id: person.id,
        name: person.name,
        email: person.email
      },
      transactions,
      summary: {
        totalReceived,
        totalGiven,
        balance,
        transactionCount: transactions.length
      }
    });
  } catch (error) {
    console.error('Get person transactions error:', error);
    res.status(500).json({ error: 'Failed to retrieve person transactions' });
  }
};

// Get top people by amount (given or received)
exports.getTopPeople = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type = 'balance', limit = 5 } = req.query;

    let queryOptions = {};

    if (type === 'given') {
      // Top people by amount given to them
      queryOptions = {
        where: {
          userId,
          isMoneyReceived: false
        },
        attributes: [
          'personId',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        include: [
          {
            model: Person,
            attributes: ['name']
          }
        ],
        group: ['personId', 'Person.id', 'Person.name'],
        order: [[sequelize.fn('SUM', sequelize.col('amount')), 'DESC']],
        limit: parseInt(limit)
      };
    } else if (type === 'received') {
      // Top people by amount received from them
      queryOptions = {
        where: {
          userId,
          isMoneyReceived: true
        },
        attributes: [
          'personId',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        include: [
          {
            model: Person,
            attributes: ['name']
          }
        ],
        group: ['personId', 'Person.id', 'Person.name'],
        order: [[sequelize.fn('SUM', sequelize.col('amount')), 'DESC']],
        limit: parseInt(limit)
      };
    } else {
      // Top people by balance (default)
      // This is a more complex query using a subquery
      const subquery = `
        SELECT
          p.id,
          p.name,
          COALESCE(SUM(CASE WHEN t.is_money_received = true THEN t.amount ELSE -t.amount END), 0) as balance
        FROM people p
        LEFT JOIN transactions t ON p.id = t.person_id
        WHERE p.user_id = :userId
        GROUP BY p.id, p.name
        ORDER BY balance DESC
        LIMIT :limit
      `;

      const [results] = await sequelize.query(subquery, {
        replacements: { userId, limit: parseInt(limit) },
        type: sequelize.QueryTypes.SELECT,
        raw: true
      });

      return res.status(200).json({ topPeople: results });
    }

    const topPeople = await Transaction.findAll(queryOptions);

    res.status(200).json({ topPeople });
  } catch (error) {
    console.error('Get top people error:', error);
    res.status(500).json({ error: 'Failed to retrieve top people' });
  }
};