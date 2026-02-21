const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Company = require('../../models/Company');
const { JWT_SECRET } = require('../../middlewares/auth');

async function register(req, res, next) {
  try {
    const { email, password, name, role, location, profile, companyProfile } = req.body;
    if (!email || !password || !name) return res.status(400).json({ success: false, error: 'Email, password and name required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
      email,
      passwordHash,
      name,
      role: role || 'job_seeker',
      location: location || undefined,
      profile: profile || undefined,
    };

    const user = await User.create(userData);

    if (role === 'employer' && companyProfile) {
      await Company.create({
        name: companyProfile.name || `${name}'s Company`,
        owner: user._id,
        description: companyProfile.description,
        website: companyProfile.website,
        locations: companyProfile.locations || [],
      });
    } else if (role === 'employer') {
      await Company.create({ name: `${name}'s Company`, owner: user._id });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, data: { token, user: user.toJSON() } });
  } catch (err) {
    next(err);
  }
}

module.exports = { register };
