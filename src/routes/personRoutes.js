// src/routes/personRoutes.js
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');
const { authenticate, isVerified } = require('../middleware/auth');
const { personValidation, validateRequest } = require('../middleware/validators');

// All routes require authentication
router.use(authenticate);
router.use(isVerified);

// Person routes
router.post('/', personValidation, validateRequest, personController.createPerson);
router.get('/', personController.getPeople);
router.get('/top', personController.getTopPeople);
router.get('/:id', personController.getPerson);
router.put('/:id', personValidation, validateRequest, personController.updatePerson);
router.delete('/:id', personController.deletePerson);
router.get('/:id/transactions', personController.getPersonTransactions);

module.exports = router;