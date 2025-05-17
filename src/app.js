// src/app.js - Simplified CORS for Option 2 (no credentials)
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const routes = require('./routes');
require('dotenv').config();

// Initialize app
const app = express();

// Security middleware with relaxed settings
app.use(helmet({
  contentSecurityPolicy: false
}));

// Parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Setting up simplified CORS configuration');

// Simple CORS setup - this works well when withCredentials is false
app.use(cors());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url} | Origin: ${req.headers.origin}`);
  next();
});

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Apply rate limiting with higher limits during testing
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // higher limit for testing
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Add a simple health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;