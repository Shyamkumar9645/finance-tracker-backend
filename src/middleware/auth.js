// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Authentication middleware to protect routes
exports.authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. Please log in.' });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user
      const user = await User.findByPk(decoded.id, {
        attributes: ['id', 'email', 'firstName', 'lastName', 'isVerified']
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found or session expired. Please log in again.' });
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed. Please try again.' });
  }
};

// Middleware to check if user is verified
exports.isVerified = async (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({ error: 'Email verification is required to access this resource.' });
  }
  next();
};