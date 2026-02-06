const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

async function summary(req, res, next) {
  try {
    const [usersCount, jobsCount, applicationsCount] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Job.countDocuments(),
      Application.countDocuments(),
    ]);
    res.json({ success: true, data: { usersCount, jobsCount, applicationsCount } });
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const search = req.query.search;
    const filter = {};
    if (search) filter.$or = [{ email: new RegExp(search, 'i') }, { name: new RegExp(search, 'i') }];
    const users = await User.find(filter).select('-passwordHash').sort({ createdAt: -1 }).limit(100).lean();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

async function banUser(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function getJobs(req, res, next) {
  try {
    const jobs = await Job.find({}).populate('company').sort({ createdAt: -1 }).limit(200).lean();
    res.json({ success: true, data: jobs });
  } catch (err) {
    next(err);
  }
}

async function hideJob(req, res, next) {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { isHidden: true });
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { summary, getUsers, banUser, getJobs, hideJob };
