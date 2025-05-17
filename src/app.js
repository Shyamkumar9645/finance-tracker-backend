// src/app.js
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

// Security middleware - but disable for testing CORS issues
// app.use(helmet());

// Parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('Setting up CORS for frontend:', process.env.CLIENT_URL);

// More permissive CORS for debugging
app.use((req, res, next) => {
  // Log each request for debugging
  console.log(`${req.method} ${req.url} | Origin: ${req.headers.origin}`);
  next();
});

// Set up CORS manually with all headers exposed for debugging
app.use((req, res, next) => {
  // Allow requests from these origins
  const allowedOrigins = [
    'https://tiny-semifreddo-fdd2a6.netlify.app',
    'http://localhost:3000'
  ];

  const origin = req.headers.origin;

  // Check if the origin is in our allowed list
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // For development, allow all origins (remove in production)
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  // Allow these methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Allow these headers
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Allow credentials
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Set preflight cache duration
  res.setHeader('Access-Control-Max-Age', '3600');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Apply rate limiting - but disable for testing
/*
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);
*/

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