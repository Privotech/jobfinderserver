const { getRecommendedJobsForUser } = require('../services/matchingService');

async function jobs(req, res, next) {
  try {
    const jobs = await getRecommendedJobsForUser(req.user._id);
    res.json({ success: true, data: jobs });
  } catch (err) {
    next(err);
  }
}

module.exports = { jobs };
