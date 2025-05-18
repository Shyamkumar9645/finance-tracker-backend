// src/controllers/transactionController.js
const { Transaction, Person, sequelize } = require('../models');
const { Op } = require('sequelize');
const { Parser } = require('json2csv');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const {
      personId,
      amount,
      isMoneyReceived,
      transactionDate,
      description,
      category,
      paymentMethod,
      isSettled,
      reminderDate,
      // Interest-related fields
      applyInterest,
      interestType,
      interestRate,
      compoundFrequency
    } = req.body;

    const userId = req.user.id;

    // Validate input
    if (!personId || !amount || transactionDate === undefined || isMoneyReceived === undefined) {
      return res.status(400).json({ error: 'Person, amount, transaction date, and transaction type are required' });
    }

    // Verify that person exists and belongs to the user
    const person = await Person.findOne({
      where: {
        id: personId,
        userId
      }
    });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Create transaction with explicit boolean conversion for booleans
    // and proper parsing for numeric values
    const transaction = await Transaction.create({
      userId,
      personId,
      amount: parseFloat(amount),
      isMoneyReceived: isMoneyReceived === true || isMoneyReceived === 'true',
      transactionDate,
      description: description || '',
      category: category || '',
      paymentMethod: paymentMethod || '',
      isSettled: isSettled === true || isSettled === 'true',
      reminderDate: reminderDate || null,

      // Interest fields with proper type conversion
      applyInterest: applyInterest === true || applyInterest === 'true',
      interestType: (applyInterest === true || applyInterest === 'true')
        ? (interestType || 'none')
        : 'none',
      interestRate: interestRate ? parseFloat(interestRate) : null,
      compoundFrequency: compoundFrequency ? parseInt(compoundFrequency) : null
    });

    // Add debugging console log
    console.log("Transaction created with interest fields:", {
      applyInterest: transaction.applyInterest,
      interestType: transaction.interestType,
      interestRate: transaction.interestRate,
      compoundFrequency: transaction.compoundFrequency
    });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: 'Failed to create transaction. Please try again.' });
  }
};
// Get all transactions for the current user
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      sortBy = 'transactionDate',
      sortOrder = 'DESC',
      personId,
      search,
      startDate,
      endDate,
      isMoneyReceived,
      category,
      isSettled
    } = req.query;

    // Build where clause
    const whereClause = { userId };

    if (personId) {
      whereClause.personId = personId;
    }

    if (startDate && endDate) {
      whereClause.transactionDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else if (startDate) {
      whereClause.transactionDate = {
        [Op.gte]: new Date(startDate)
      };
    } else if (endDate) {
      whereClause.transactionDate = {
        [Op.lte]: new Date(endDate)
      };
    }

    if (isMoneyReceived !== undefined) {
      whereClause.isMoneyReceived = isMoneyReceived === 'true';
    }

    if (category) {
      whereClause.category = category;
    }

    if (isSettled !== undefined) {
      whereClause.isSettled = isSettled === 'true';
    }

    // Build search filter
    let personWhereClause = {};
    if (search) {
      personWhereClause = {
        name: {
          [Op.iLike]: `%${search}%`
        }
      };

      // Also search in description
      if (!whereClause[Op.or]) {
        whereClause[Op.or] = [];
      }

      whereClause[Op.or].push({
        description: {
          [Op.iLike]: `%${search}%`
        }
      });
    }

    // Get transactions
    const transactions = await Transaction.findAll({
      where: whereClause,
      include: [
        {
          model: Person,
          where: personWhereClause,
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [[sortBy, sortOrder]],
    });

    res.status(200).json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Failed to retrieve transactions' });
  }
};

// Get a specific transaction
exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({
      where: {
        id,
        userId
      },
      include: [
        {
          model: Person,
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json({ transaction });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ error: 'Failed to retrieve transaction' });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { personId, amount, isMoneyReceived, transactionDate, description, category, paymentMethod, isSettled, reminderDate } = req.body;

    // Find the transaction
    const transaction = await Transaction.findOne({
      where: {
        id,
        userId
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // If personId is provided, verify that person exists and belongs to the user
    if (personId && personId !== transaction.personId) {
      const person = await Person.findOne({
        where: {
          id: personId,
          userId
        }
      });

      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
    }

    // Update transaction
    await transaction.update({
      personId: personId || transaction.personId,
      amount: amount !== undefined ? amount : transaction.amount,
      isMoneyReceived: isMoneyReceived !== undefined ? isMoneyReceived : transaction.isMoneyReceived,
      transactionDate: transactionDate || transaction.transactionDate,
      description: description !== undefined ? description : transaction.description,
      category: category !== undefined ? category : transaction.category,
      paymentMethod: paymentMethod !== undefined ? paymentMethod : transaction.paymentMethod,
      isSettled: isSettled !== undefined ? isSettled : transaction.isSettled,
      reminderDate: reminderDate !== undefined ? reminderDate : transaction.reminderDate
    });

    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ error: 'Failed to update transaction. Please try again.' });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({
      where: {
        id,
        userId
      }
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transaction.destroy();

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ error: 'Failed to delete transaction. Please try again.' });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Use a transaction to ensure data consistency
    const stats = await sequelize.transaction(async (t) => {
      // Get total money given and received
      const totalStats = await Transaction.findAll({
        attributes: [
          'isMoneyReceived',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        where: { userId },
        group: ['isMoneyReceived'],
        transaction: t
      });

      // Calculate totals
      let totalGiven = 0;
      let totalReceived = 0;
      let givenCount = 0;
      let receivedCount = 0;

      // Get transaction counts
      const countStats = await Transaction.findAll({
        attributes: [
          'isMoneyReceived',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        where: { userId },
        group: ['isMoneyReceived'],
        transaction: t
      });

      countStats.forEach(stat => {
        if (stat.isMoneyReceived) {
          receivedCount = parseInt(stat.dataValues.count || 0);
        } else {
          givenCount = parseInt(stat.dataValues.count || 0);
        }
      });

      totalStats.forEach(stat => {
        if (stat.isMoneyReceived) {
          totalReceived = parseFloat(stat.dataValues.total || 0);
        } else {
          totalGiven = parseFloat(stat.dataValues.total || 0);
        }
      });

      // Calculate balance
      const balance = totalReceived - totalGiven;

      // Get top people who have given money (creditors)
      const topGivers = await Transaction.findAll({
        attributes: [
          'personId',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        where: {
          userId,
          isMoneyReceived: true
        },
        include: [
          {
            model: Person,
            attributes: ['name']
          }
        ],
        group: ['personId', 'Person.id', 'Person.name'],
        order: [[sequelize.fn('SUM', sequelize.col('amount')), 'DESC']],
        limit: 3,
        transaction: t
      });

      // Get top people who have received money (debtors)
      const topReceivers = await Transaction.findAll({
        attributes: [
          'personId',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        where: {
          userId,
          isMoneyReceived: false
        },
        include: [
          {
            model: Person,
            attributes: ['name']
          }
        ],
        group: ['personId', 'Person.id', 'Person.name'],
        order: [[sequelize.fn('SUM', sequelize.col('amount')), 'DESC']],
        limit: 3,
        transaction: t
      });

      // Get recent transactions
      const recentTransactions = await Transaction.findAll({
        where: { userId },
        include: [
          {
            model: Person,
            attributes: ['id', 'name']
          }
        ],
        order: [['transactionDate', 'DESC']],
        limit: 5,
        transaction: t
      });

      // Get transaction count by month (for charts)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const transactionsByMonth = await Transaction.findAll({
        attributes: [
          [sequelize.fn('date_trunc', 'month', sequelize.col('transaction_date')), 'month'],
          'isMoneyReceived',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        where: {
          userId,
          transactionDate: {
            [Op.gte]: sixMonthsAgo
          }
        },
        group: ['month', 'isMoneyReceived'],
        order: [[sequelize.fn('date_trunc', 'month', sequelize.col('transaction_date')), 'ASC']],
        transaction: t
      });

      // Format data for processing in frontend
      const topCreditorsData = topGivers.map(item => ({
        personId: item.personId,
        Person: item.Person,
        total: parseFloat(item.dataValues.total || 0)
      }));

      const topDebtorsData = topReceivers.map(item => ({
        personId: item.personId,
        Person: item.Person,
        total: parseFloat(item.dataValues.total || 0)
      }));

      const transactionsByMonthData = transactionsByMonth.map(item => ({
        month: item.dataValues.month,
        isMoneyReceived: item.isMoneyReceived,
        total: parseFloat(item.dataValues.total || 0)
      }));

      return {
        totalGiven,
        totalReceived,
        givenCount,
        receivedCount,
        balance,
        topGivers: topCreditorsData,
        topReceivers: topDebtorsData,
        recentTransactions,
        transactionsByMonth: transactionsByMonthData
      };
    });

    res.status(200).json({ stats });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve dashboard statistics' });
  }
};

// Get person-specific statistics
exports.getPersonStats = async (req, res) => {
  try {
    const { personId } = req.params;
    const userId = req.user.id;

    // Verify that person exists and belongs to the user
    const person = await Person.findOne({
      where: {
        id: personId,
        userId
      }
    });

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Use a transaction to ensure data consistency
    const stats = await sequelize.transaction(async (t) => {
      // Get total money given to and received from this person
      const totalStats = await Transaction.findAll({
        attributes: [
          'isMoneyReceived',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        where: {
          userId,
          personId
        },
        group: ['isMoneyReceived'],
        transaction: t
      });

      // Calculate totals
      let totalGiven = 0;
      let totalReceived = 0;
      let givenCount = 0;
      let receivedCount = 0;

      totalStats.forEach(stat => {
        if (stat.isMoneyReceived) {
          totalReceived = parseFloat(stat.dataValues.total || 0);
          receivedCount = parseInt(stat.dataValues.count || 0);
        } else {
          totalGiven = parseFloat(stat.dataValues.total || 0);
          givenCount = parseInt(stat.dataValues.count || 0);
        }
      });

      // Calculate balance
      const balance = totalReceived - totalGiven;

      // Get transactions with this person
      const transactions = await Transaction.findAll({
        where: {
          userId,
          personId
        },
        order: [['transactionDate', 'DESC']],
        transaction: t
      });

      // Get transaction count by month (for charts)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const transactionsByMonth = await Transaction.findAll({
        attributes: [
          [sequelize.fn('date_trunc', 'month', sequelize.col('transaction_date')), 'month'],
          'isMoneyReceived',
          [sequelize.fn('SUM', sequelize.col('amount')), 'total']
        ],
        where: {
          userId,
          personId,
          transactionDate: {
            [Op.gte]: sixMonthsAgo
          }
        },
        group: ['month', 'isMoneyReceived'],
        order: [[sequelize.fn('date_trunc', 'month', sequelize.col('transaction_date')), 'ASC']],
        transaction: t
      });

      // Format transactionsByMonth for the frontend
      const transactionsByMonthData = transactionsByMonth.map(item => ({
        month: item.dataValues.month,
        isMoneyReceived: item.isMoneyReceived,
        total: parseFloat(item.dataValues.total || 0)
      }));

      return {
        person,
        totalGiven,
        totalReceived,
        givenCount,
        receivedCount,
        balance,
        transactions,
        transactionsByMonth: transactionsByMonthData
      };
    });

    res.status(200).json({ stats });
  } catch (error) {
    console.error('Get person stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve person statistics' });
  }
};
// Export transactions as CSV
exports.exportTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { personId } = req.query;

    // Build where clause
    const whereClause = { userId };

    if (personId) {
      whereClause.personId = personId;
    }

    // Get transactions
    const transactions = await Transaction.findAll({
      where: whereClause,
      include: [
        {
          model: Person,
          attributes: ['name', 'email']
        }
      ],
      order: [['transactionDate', 'DESC']]
    });

    // Transform data for CSV
    const csvData = transactions.map(transaction => {
      return {
        'Person': transaction.Person.name,
        'Email': transaction.Person.email || '',
        'Amount': transaction.amount,
        'Type': transaction.isMoneyReceived ? 'Received' : 'Given',
        'Date': new Date(transaction.transactionDate).toLocaleDateString(),
        'Description': transaction.description || '',
        'Category': transaction.category || '',
        'Payment Method': transaction.paymentMethod || '',
        'Settled': transaction.isSettled ? 'Yes' : 'No'
      };
    });

    // Generate CSV
    const fields = ['Person', 'Email', 'Amount', 'Type', 'Date', 'Description', 'Category', 'Payment Method', 'Settled'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(csvData);

    // Set response headers
    const filename = personId
      ? `transactions_${transactions[0]?.Person?.name || personId}.csv`
      : 'all_transactions.csv';

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    // Send CSV
    res.status(200).send(csv);
  } catch (error) {
    console.error('Export transactions error:', error);
    res.status(500).json({ error: 'Failed to export transactions. Please try again.' });
  }
};