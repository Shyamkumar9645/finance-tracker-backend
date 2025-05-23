// src/controllers/interestController.js - Fixed version

const { Transaction, Person, sequelize } = require('../models');
const { Op } = require('sequelize');
const { calculateInterest, calculateSimpleInterest, calculateCompoundInterest } = require('../utils/interestCalculator');

// Get interest details for a specific transaction
exports.getTransactionInterest = async (req, res) => {
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
          attributes: ['id', 'name']
        }
      ]
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Calculate interest up to current date
    const currentDate = new Date();
    const interestDetails = calculateInterest(transaction, currentDate);

    // Include both simple and compound interest calculations
    res.status(200).json({
      transaction,
      interestDetails
    });
  } catch (error) {
    console.error('Get transaction interest error:', error);
    res.status(500).json({ error: 'Failed to calculate interest. Please try again.' });
  }
};

// Get total interest summary for all transactions
exports.getInterestSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { personId } = req.query;

    // Build the where clause
    const whereClause = {
      userId
    };

    if (personId) {
      whereClause.personId = personId;
    }

    // Get all transactions
    const transactions = await Transaction.findAll({
      where: whereClause,
      include: [
        {
          model: Person,
          attributes: ['id', 'name']
        }
      ]
    });

    // Calculate interest for each transaction
    const currentDate = new Date();
    const interestDetails = transactions.map(transaction => {
      const interest = calculateInterest(transaction, currentDate);
      return {
        transactionId: transaction.id,
        personName: transaction.Person.name,
        amount: parseFloat(transaction.amount),
        transactionDate: transaction.transactionDate,
        isMoneyReceived: transaction.isMoneyReceived,
        daysElapsed: interest.simpleInterest.daysElapsed,
        interestType: transaction.interestType,
        interestRate: transaction.interestRate,
        applyInterest: transaction.applyInterest,
        simpleInterest: interest.simpleInterest.interestAmount,
        simpleInterestTotal: interest.simpleInterest.totalWithInterest,
        compoundInterest: interest.compoundInterest.interestAmount,
        compoundInterestTotal: interest.compoundInterest.totalWithInterest
      };
    });

    // Calculate totals
    let totalPrincipal = 0;
    let totalSimpleInterest = 0;
    let totalCompoundInterest = 0;

    interestDetails.forEach(detail => {
      if (detail.isMoneyReceived) {
        totalPrincipal += detail.amount;
        totalSimpleInterest += detail.simpleInterest;
        totalCompoundInterest += detail.compoundInterest;
      } else {
        totalPrincipal -= detail.amount;
        totalSimpleInterest -= detail.simpleInterest;
        totalCompoundInterest -= detail.compoundInterest;
      }
    });

    res.status(200).json({
      transactions: interestDetails,
      summary: {
        totalPrincipal,
        totalSimpleInterest,
        totalWithSimpleInterest: totalPrincipal + totalSimpleInterest,
        totalCompoundInterest,
        totalWithCompoundInterest: totalPrincipal + totalCompoundInterest,
        transactionCount: interestDetails.length
      }
    });
  } catch (error) {
    console.error('Get interest summary error:', error);
    res.status(500).json({ error: 'Failed to calculate interest summary. Please try again.' });
  }
};

// Get interest summary by person
exports.getPersonInterestSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all transactions
    const transactions = await Transaction.findAll({
      where: { userId },
      include: [
        {
          model: Person,
          attributes: ['id', 'name']
        }
      ]
    });

    // Calculate interest for each transaction
    const currentDate = new Date();
    const transactionDetails = transactions.map(transaction => {
      const interest = calculateInterest(transaction, currentDate);
      return {
        transactionId: transaction.id,
        personId: transaction.personId,
        personName: transaction.Person.name,
        amount: parseFloat(transaction.amount),
        isMoneyReceived: transaction.isMoneyReceived,
        simpleInterest: interest.simpleInterest.interestAmount,
        compoundInterest: interest.compoundInterest.interestAmount,
        applyInterest: transaction.applyInterest
      };
    });

    // Group by person
    const personSummary = {};

    transactionDetails.forEach(detail => {
      const personId = detail.personId;

      if (!personSummary[personId]) {
        personSummary[personId] = {
          personId,
          personName: detail.personName,
          transactions: [],
          totalPrincipal: 0,
          totalSimpleInterest: 0,
          totalCompoundInterest: 0
        };
      }

      personSummary[personId].transactions.push(detail);

      if (detail.isMoneyReceived) {
        personSummary[personId].totalPrincipal += detail.amount;
        personSummary[personId].totalSimpleInterest += detail.simpleInterest;
        personSummary[personId].totalCompoundInterest += detail.compoundInterest;
      } else {
        personSummary[personId].totalPrincipal -= detail.amount;
        personSummary[personId].totalSimpleInterest -= detail.simpleInterest;
        personSummary[personId].totalCompoundInterest -= detail.compoundInterest;
      }
    });

    // Convert to array and calculate totals
    const summary = Object.values(personSummary).map(person => ({
      ...person,
      totalWithSimpleInterest: person.totalPrincipal + person.totalSimpleInterest,
      totalWithCompoundInterest: person.totalPrincipal + person.totalCompoundInterest,
      transactionCount: person.transactions.length
    }));

    res.status(200).json({ personSummary: summary });
  } catch (error) {
    console.error('Get person interest summary error:', error);
    res.status(500).json({ error: 'Failed to calculate person interest summary. Please try again.' });
  }
};

// Update interest settings for a transaction
exports.updateTransactionInterest = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { applyInterest, interestType, interestRate, compoundFrequency } = req.body;

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

    // Create an update object with properly converted types
    const updateData = {
      applyInterest: applyInterest !== undefined
        ? (applyInterest === true || applyInterest === 'true')
        : transaction.applyInterest
    };

    // Only set interestType if applyInterest is true, otherwise force 'none'
    if (updateData.applyInterest) {
      updateData.interestType = interestType || transaction.interestType;
    } else {
      updateData.interestType = 'none';
    }

    // Handle interest rate and compound frequency
    if (interestRate !== undefined) {
      updateData.interestRate = interestRate ? parseFloat(interestRate) : null;
    }

    if (compoundFrequency !== undefined) {
      updateData.compoundFrequency = compoundFrequency ? parseInt(compoundFrequency) : null;
    }

    console.log('Updating transaction interest settings:', updateData);

    // Update transaction
    await transaction.update(updateData);

    // Fetch the updated transaction to ensure we return the correct data
    const updatedTransaction = await Transaction.findByPk(id);

    // Calculate new interest amounts
    const currentDate = new Date();
    const interestDetails = calculateInterest(updatedTransaction, currentDate);

    res.status(200).json({
      message: 'Transaction interest settings updated successfully',
      transaction: updatedTransaction,
      interestDetails
    });
  } catch (error) {
    console.error('Update transaction interest error:', error);
    res.status(500).json({ error: 'Failed to update interest settings. Please try again.' });
  }
};