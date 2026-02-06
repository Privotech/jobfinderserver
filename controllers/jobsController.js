const Job = require('../models/Job');
const SavedJob = require('../models/SavedJob');
const { getRecommendationsForJob } = require('../services/matchingService');

async function list(req, res, next) {
  try {
    const { page = 1, limit = 20, keyword, location, country, employmentType, salaryMin, salaryMax } = req.query;
    const filter = { status: 'open', isHidden: false };
    if (keyword) filter.$or = [{ title: new RegExp(keyword, 'i') }, { description: new RegExp(keyword, 'i') }];
    if (location) filter.location = new RegExp(location, 'i');
    if (country) filter.location = new RegExp(country, 'i');
    if (employmentType) filter.employmentType = employmentType;
    if (salaryMin) filter.salaryMax = { $gte: Number(salaryMin) };
    if (salaryMax) filter.salaryMin = { $lte: Number(salaryMax) };
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * Math.min(50, parseInt(limit, 10) || 20);
    const limitNum = Math.min(50, parseInt(limit, 10) || 20);
    const [jobs, total] = await Promise.all([Job.find(filter).populate('company').sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(), Job.countDocuments(filter)]);
    res.json({ success: true, data: { jobs, total } });
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const job = await Job.findById(req.params.id).populate('company').lean();
    if (!job || job.isHidden) return res.status(404).json({ success: false, error: 'Job not found' });
    let savedIds = [];
    if (req.user) {
      const saved = await SavedJob.find({ user: req.user._id }).distinct('job');
      savedIds = saved.map((id) => id.toString());
    }
    const recommendations = await getRecommendationsForJob(job._id, job);
    res.json({ success: true, data: { ...job, savedIds, recommendations } });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne };
