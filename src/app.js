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

// Security middleware
app.use(helmet());

// Parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - Fixed to allow your frontend domain
app.use(cors({
  // Allow specific frontend origins
  origin: ["https://tiny-semifreddo-fdd2a6.netlify.app", "http://localhost:3000","https://tiny-semifreddo-fdd2a6.netlify.app/api"],
  // Allow all HTTP methods
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // Allow these headers in requests
  allowedHeaders: "Content-Type,Authorization",
  // Allow credentials (cookies, auth headers)
  credentials: true,
  // Cache preflight response for 1 hour (3600 seconds)
  optionsSuccessStatus: 204,
  preflightContinue: false,
  maxAge: 3600
}));

// Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// API routes
app.use('/api', routes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;