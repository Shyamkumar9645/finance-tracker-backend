const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY
  });
};

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide username, email and password'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: 'fail',
        message: 'Password must be at least 8 characters long'
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        status: 'fail',
        message: 'User with this email or username already exists'
      });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login user
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check for account lock
    if (user && user.accountLocked) {
      return res.status(401).json({
        status: 'fail',
        message: 'Account locked due to multiple failed attempts. Please contact support.'
      });
    }

    // Check if user exists and password is correct
    if (user && (await user.isValidPassword(password))) {
      // Reset failed login attempts
      user.failedLoginAttempts = 0;
      user.lastLogin = Date.now();
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      return res.json({
        status: 'success',
        token,
        data: {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email
          }
        }
      });
    } else if (user) {
      // Increment failed login attempts
      user.failedLoginAttempts += 1;

      // Lock account after 5 failed attempts
      if (user.failedLoginAttempts >= 5) {
        user.accountLocked = true;
      }

      await user.save();
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials'
      });
    } else {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    next(error);
  }
});

// Get user profile
router.get('/profile', protect, async (req, res, next) => {
  try {
    res.json({
      status: 'success',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
});

// Change password
router.put('/change-password', protect, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide current password and new password'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        status: 'fail',
        message: 'New password must be at least 8 characters long'
      });
    }

    const user = await User.findById(req.user._id);

    // Verify current password
    if (!(await user.isValidPassword(currentPassword))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      status: 'success',
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;