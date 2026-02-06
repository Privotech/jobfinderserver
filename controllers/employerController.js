const Job = require("../models/Job");
const Company = require("../models/Company");
const Application = require("../models/Application");

async function getCompany(req, res, next) {
  try {
    const company = await Company.findOne({ owner: req.user._id }).lean();
    if (!company)
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    res.json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
}

async function updateCompany(req, res, next) {
  try {
    const company = await Company.findOneAndUpdate(
      { owner: req.user._id },
      req.body,
      { new: true },
    );
    if (!company)
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    res.json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
}

async function getSummary(req, res, next) {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    if (!company) {
      return res.json({
        success: true,
        data: { totalJobs: 0, totalApplications: 0, unreviewedApplications: 0 },
      });
    }

    const jobs = await Job.find({ company: company._id }).select("_id");
    const jobIds = jobs.map((j) => j._id);

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });
    const unreviewedApplications = await Application.countDocuments({
      job: { $in: jobIds },
      status: { $in: ["pending", "applied"] },
    });

    res.json({
      success: true,
      data: {
        totalJobs: jobs.length,
        totalApplications,
        unreviewedApplications,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getJobs(req, res, next) {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    if (!company) return res.json({ success: true, data: [] });
    const jobs = await Job.find({ company: company._id })
      .populate("company")
      .sort({ createdAt: -1 })
      .lean();

    // Add applicant counts to each job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({
          job: job._id,
        });
        return { ...job, applicantCount };
      }),
    );

    res.json({ success: true, data: jobsWithCounts });
  } catch (err) {
    next(err);
  }
}

async function createJob(req, res, next) {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    if (!company)
      return res
        .status(400)
        .json({ success: false, error: "Create company first" });
    const job = await Job.create({
      ...req.body,
      company: company._id,
      creator: req.user._id,
    });
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
}

async function updateJob(req, res, next) {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    if (!company)
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, company: company._id },
      req.body,
      { new: true },
    );
    if (!job)
      return res.status(404).json({ success: false, error: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
}

async function deleteJob(req, res, next) {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    if (!company)
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      company: company._id,
    });
    if (!job)
      return res.status(404).json({ success: false, error: "Job not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function getApplications(req, res, next) {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    if (!company) return res.json({ success: true, data: [] });
    const job = await Job.findOne({
      _id: req.params.jobId,
      company: company._id,
    });
    if (!job)
      return res.status(404).json({ success: false, error: "Job not found" });
    const apps = await Application.find({ job: job._id })
      .populate("candidate")
      .populate("resume")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: apps });
  } catch (err) {
    next(err);
  }
}

async function updateApplicationStatus(req, res, next) {
  try {
    const { status } = req.body;
    const app = await Application.findById(req.params.id).populate("job");
    if (!app)
      return res
        .status(404)
        .json({ success: false, error: "Application not found" });
    const company = await Company.findOne({ owner: req.user._id });
    if (!company || app.job.company.toString() !== company._id.toString())
      return res.status(403).json({ success: false, error: "Forbidden" });
    app.status = status;
    await app.save();
    res.json({ success: true, data: app });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCompany,
  updateCompany,
  getSummary,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getApplications,
  updateApplicationStatus,
};
