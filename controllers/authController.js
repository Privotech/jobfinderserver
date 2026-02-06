const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');
const { JWT_SECRET } = require('../middlewares/auth');

async function register(req, res, next) {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ success: false, error: 'Email, password and name required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name, role: role || 'job_seeker' });
    if (role === 'employer') await Company.create({ name: `${name}'s Company`, owner: user._id });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, data: { token, user: user.toJSON() } });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user || !user.isActive) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, data: { token, user: user.toJSON() } });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    res.json({ success: true, data: req.user.toJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, me };
