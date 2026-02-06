const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    User.findById(decoded.userId).then((user) => {
      if (!user || !user.isActive) return res.status(401).json({ success: false, error: 'Unauthorized' });
      req.user = user;
      next();
    }).catch(() => res.status(401).json({ success: false, error: 'Unauthorized' }));
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next();
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    User.findById(decoded.userId).then((user) => {
      if (user && user.isActive) req.user = user;
      next();
    }).catch(() => next());
  } catch {
    next();
  }
}

module.exports = { authMiddleware, optionalAuth, JWT_SECRET };
