const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  //Get token from header
  const token = req.headers.authorization?.split(' ')[1];

  //Error if no token is provided
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  //Verify token
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id; // Save user ID for later use
    next();
  });
};

module.exports = authMiddleware;