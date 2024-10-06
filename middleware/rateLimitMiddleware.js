const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 5, // Limit to 5 requests
  message: 'Too many requests, please try again later.',
});

module.exports = limiter;