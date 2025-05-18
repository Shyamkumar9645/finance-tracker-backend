// src/utils/interestCalculator.js - Fixed version that handles all interest types
const env = require('../config/env');

/**
 * Calculate simple interest for a given transaction
 *
 * @param {Object} transaction - The transaction object
 * @param {Date} currentDate - The date to calculate interest up to (default: now)
 * @returns {Object} - Object containing interest details
 */
exports.calculateSimpleInterest = (transaction, currentDate = new Date()) => {
  if (!transaction) {
    return {
      interestAmount: 0,
      totalWithInterest: 0,
      daysElapsed: 0,
      interestRate: 0
    };
  }

  // Get the transaction date
  const transactionDate = new Date(transaction.transactionDate);

  // Calculate days elapsed (time difference in milliseconds / milliseconds in a day)
  const daysElapsed = Math.floor((currentDate - transactionDate) / (1000 * 60 * 60 * 24));

  // If negative days or zero days, return zero interest
  if (daysElapsed <= 0) {
    return {
      interestAmount: 0,
      totalWithInterest: parseFloat(transaction.amount || 0),
      daysElapsed: 0,
      interestRate: parseFloat(transaction.interestRate || env.SIMPLE_INTEREST_ANNUAL_RATE)
    };
  }

  // Get the interest rate (from transaction or fall back to env variable)
  const annualRate = parseFloat(transaction.interestRate || env.SIMPLE_INTEREST_ANNUAL_RATE) / 100;

  // Calculate simple interest: Principal * Rate * Time
  // Time is in years (days / 365)
  const principal = parseFloat(transaction.amount || 0);
  const interestAmount = principal * annualRate * (daysElapsed / 365);

  return {
    interestAmount,
    totalWithInterest: principal + interestAmount,
    daysElapsed,
    interestRate: annualRate * 100
  };
};

/**
 * Calculate compound interest for a given transaction
 *
 * @param {Object} transaction - The transaction object
 * @param {Date} currentDate - The date to calculate interest up to (default: now)
 * @returns {Object} - Object containing interest details
 */
exports.calculateCompoundInterest = (transaction, currentDate = new Date()) => {
  if (!transaction) {
    return {
      interestAmount: 0,
      totalWithInterest: 0,
      daysElapsed: 0,
      interestRate: 0,
      frequency: 0
    };
  }

  // Get the transaction date
  const transactionDate = new Date(transaction.transactionDate);

  // Calculate days elapsed
  const daysElapsed = Math.floor((currentDate - transactionDate) / (1000 * 60 * 60 * 24));

  // If negative days or zero days, return zero interest
  if (daysElapsed <= 0) {
    return {
      interestAmount: 0,
      totalWithInterest: parseFloat(transaction.amount || 0),
      daysElapsed: 0,
      interestRate: parseFloat(transaction.interestRate || env.COMPOUND_INTEREST_ANNUAL_RATE),
      frequency: parseInt(transaction.compoundFrequency || env.COMPOUND_INTEREST_FREQUENCY)
    };
  }

  // Get the interest rate and compounding frequency
  const annualRate = parseFloat(transaction.interestRate || env.COMPOUND_INTEREST_ANNUAL_RATE) / 100;
  const compoundFrequency = parseInt(transaction.compoundFrequency || env.COMPOUND_INTEREST_FREQUENCY);

  // Calculate compound interest using the formula: P(1 + r/n)^(nt)
  // Where:
  // P = Principal
  // r = Annual interest rate (decimal)
  // n = Number of times compounded per year
  // t = Time in years
  const principal = parseFloat(transaction.amount || 0);
  const timeInYears = daysElapsed / 365;

  // Calculate using compound interest formula
  const totalWithInterest = principal * Math.pow(1 + (annualRate / compoundFrequency), compoundFrequency * timeInYears);
  const interestAmount = totalWithInterest - principal;

  return {
    interestAmount,
    totalWithInterest,
    daysElapsed,
    interestRate: annualRate * 100,
    frequency: compoundFrequency
  };
};

/**
 * Calculate interest based on transaction type
 *
 * @param {Object} transaction - The transaction object
 * @param {Date} currentDate - The date to calculate interest up to (default: now)
 * @returns {Object} - Object containing interest details
 */
exports.calculateInterest = (transaction, currentDate = new Date()) => {
  if (!transaction) {
    return {
      simpleInterest: { interestAmount: 0, totalWithInterest: 0 },
      compoundInterest: { interestAmount: 0, totalWithInterest: 0 }
    };
  }

  // Log the transaction being processed for debugging
  console.log('Calculating interest for transaction:', {
    id: transaction.id,
    amount: transaction.amount,
    applyInterest: transaction.applyInterest,
    interestType: transaction.interestType,
    interestRate: transaction.interestRate,
    compoundFrequency: transaction.compoundFrequency
  });

  // Calculate both types of interest, regardless of transaction.interestType
  // This way we can always show a comparison
  const simpleInterest = this.calculateSimpleInterest(transaction, currentDate);
  const compoundInterest = this.calculateCompoundInterest(transaction, currentDate);

  // If it's not an interest-bearing transaction, both should return zero
  if (!transaction.applyInterest) {
    return {
      simpleInterest: {
        interestAmount: 0,
        totalWithInterest: parseFloat(transaction.amount || 0),
        daysElapsed: 0,
        interestRate: 0
      },
      compoundInterest: {
        interestAmount: 0,
        totalWithInterest: parseFloat(transaction.amount || 0),
        daysElapsed: 0,
        interestRate: 0,
        frequency: 0
      }
    };
  }

  return {
    simpleInterest,
    compoundInterest
  };
};