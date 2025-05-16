exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Check for specific error types
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token. Please log in again.' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired. Please log in again.' });
  }

  // Default to 500 server error
  res.status(500).json({ error: 'Something went wrong. Please try again later.' });
};

// 404 middleware for routes not found
exports.notFound = (req, res) => {
  res.status(404).json({ error: 'Resource not found' });
};