const { body, validationResult } = require('express-validator');

// Middleware to validate request data
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for user registration
exports.registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('First name cannot be empty'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Last name cannot be empty')
];

// Validation rules for login
exports.loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .not().isEmpty()
    .withMessage('Password is required')
];

// Validation rules for password reset
exports.resetPasswordValidation = [
  body('token')
    .not().isEmpty()
    .withMessage('Token is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

// Validation rules for password change
exports.changePasswordValidation = [
  body('currentPassword')
    .not().isEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

// Validation rules for creating/updating a person
exports.personValidation = [
  body('name')
    .trim()
    .not().isEmpty()
    .withMessage('Name is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Name must be between 1 and 255 characters'),
  body('email')
    .optional({ nullable: true })
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 50 })
    .withMessage('Phone number must be less than 50 characters')
];

// Validation rules for creating/updating a transaction
exports.transactionValidation = [
  body('personId')
    .isInt({ min: 1 })
    .withMessage('Valid person ID is required'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  body('isMoneyReceived')
    .isBoolean()
    .withMessage('Transaction type (isMoneyReceived) must be a boolean'),
  body('transactionDate')
    .isISO8601()
    .withMessage('Valid transaction date is required'),
  body('description')
    .optional({ nullable: true })
    .trim(),
  body('category')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category must be less than 100 characters'),
  body('paymentMethod')
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Payment method must be less than 100 characters'),
  body('isSettled')
    .optional()
    .isBoolean()
    .withMessage('isSettled must be a boolean'),
  body('reminderDate')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('Valid reminder date is required')
];