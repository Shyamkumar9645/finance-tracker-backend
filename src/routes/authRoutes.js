// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const {
  registerValidation,
  loginValidation,
  resetPasswordValidation,
  changePasswordValidation,
  validateRequest
} = require('../middleware/validators');

// Public routes
router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/login', loginValidation, validateRequest, authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', resetPasswordValidation, validateRequest, authController.resetPassword);

// Protected routes
//router.get('/profile', authenticate, authController.getProfile);
//router.put('/profile', authenticate, authController.updateProfile);
//router.post('/change-password', authenticate, changePasswordValidation, validateRequest, authController.changePassword);

module.exports = router;

