// src/routes/interestRoutes.js
const express = require('express');
const router = express.Router();
const interestController = require('../controllers/interestController');
const { authenticate, isVerified } = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);
router.use(isVerified);

// Interest routes
router.get('/summary', interestController.getInterestSummary);
router.get('/person-summary', interestController.getPersonInterestSummary);
router.get('/transaction/:id', interestController.getTransactionInterest);
router.put('/transaction/:id', interestController.updateTransactionInterest);

module.exports = router;