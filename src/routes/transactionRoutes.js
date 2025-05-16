// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authenticate, isVerified } = require('../middleware/auth');
const { transactionValidation, validateRequest } = require('../middleware/validators');

// All routes require authentication
router.use(authenticate);
router.use(isVerified);

// Transaction routes
router.post('/', transactionValidation, validateRequest, transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/export', transactionController.exportTransactions);
router.get('/dashboard', transactionController.getDashboardStats);
router.get('/person/:personId/stats', transactionController.getPersonStats);
router.get('/:id', transactionController.getTransaction);
router.put('/:id', transactionValidation, validateRequest, transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;