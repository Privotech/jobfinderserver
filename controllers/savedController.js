const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');

async function list(req, res, next) {
  try {
    const saved = await SavedJob.find({ user: req.user._id }).populate('job').sort({ createdAt: -1 });
    const jobs = saved.map((s) => s.job).filter(Boolean);
    res.json({ success: true, data: { jobs } });
  } catch (err) {
    next(err);
  }
}

async function add(req, res, next) {
  try {
    const { jobId } = req.body;
    if (!jobId) return res.status(400).json({ success: false, error: 'jobId required' });
    await SavedJob.findOneAndUpdate(
      { user: req.user._id, job: jobId },
      { user: req.user._id, job: jobId },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await SavedJob.findOneAndDelete({ user: req.user._id, job: req.params.jobId });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, add, remove };
