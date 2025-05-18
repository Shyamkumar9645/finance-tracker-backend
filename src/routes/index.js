const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const personRoutes = require('./personRoutes');
const transactionRoutes = require('./transactionRoutes');
const interestRoutes = require('./interestRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/people', personRoutes);
router.use('/transactions', transactionRoutes);
router.use('/interest', interestRoutes);

// API health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running'
  });
});

module.exports = router;