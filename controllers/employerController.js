// Import database models
const Job = require("../models/Job");
const Company = require("../models/Company");
const Application = require("../models/Application");

/**
 * Retrieve the employer's company profile
 * @returns {object} Company data with owner matching current user
 */
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

/**
 * Update the employer's company profile with new data
 */
async function updateCompany(req, res, next) {
  try {
    // Find and update company owned by current user
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

/**
 * Get dashboard summary statistics for the employer
 * @returns {object} Summary containing total jobs, applications, and unreviewed applications
 */
async function getSummary(req, res, next) {
  try {
    // Find company owned by current user
    const company = await Company.findOne({ owner: req.user._id });
    if (!company) {
      // Return empty stats if employer has no company yet
      return res.json({
        success: true,
        data: { totalJobs: 0, totalApplications: 0, unreviewedApplications: 0 },
      });
    }

    // Get all job IDs for this company
    const jobs = await Job.find({ company: company._id }).select("_id");
    const jobIds = jobs.map((j) => j._id);

    // Count all applications for company's jobs
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    // Count unreviewed applications (pending or newly applied)
    const unreviewedApplications = await Application.countDocuments({
      job: { $in: jobIds },
      status: { $in: ["pending", "applied"] },
    });

    // Return summary statistics
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

/**
 * Get all jobs posted by the employer with applicant counts
 * @returns {array} List of jobs with applicantCount field added
 */
async function getJobs(req, res, next) {
  try {
    // Find company owned by current user
    const company = await Company.findOne({ owner: req.user._id });
    if (!company) return res.json({ success: true, data: [] });

    // Get all jobs for this company
    const jobs = await Job.find({ company: company._id })
      .populate("company")
      .sort({ createdAt: -1 })
      .lean();

    // Enhance each job with applicant count
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({
          job: job._id,
        });
        return { ...job, applicantCount };
      }),
    );

    // Return jobs with applicant metrics
    res.json({ success: true, data: jobsWithCounts });
  } catch (err) {
    next(err);
  }
}

/**
 * Create a new job posting
 * @requires Company must exist for the employer
 */
async function createJob(req, res, next) {
  try {
    // Verify employer has created a company profile
    const company = await Company.findOne({ owner: req.user._id });
    if (!company)
      return res
        .status(400)
        .json({ success: false, error: "Create company first" });

    // Create job linked to company
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

/**
 * Update an existing job posting (owner only)
 */
async function updateJob(req, res, next) {
  try {
    // Verify company ownership
    const company = await Company.findOne({ owner: req.user._id });
    if (!company)
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });

    // Update job (ensures it belongs to employer's company)
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

/**
 * Delete a job posting (owner only)
 */
async function deleteJob(req, res, next) {
  try {
    // Verify company ownership
    const company = await Company.findOne({ owner: req.user._id });
    if (!company)
      return res
        .status(404)
        .json({ success: false, error: "Company not found" });

    // Delete job (ensures it belongs to employer's company)
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
    // Verify company ownership
    const company = await Company.findOne({ owner: req.user._id });
    if (!company) return res.json({ success: true, data: [] });

    // Verify job belongs to employer
    const job = await Job.findOne({
      _id: req.params.jobId,
      company: company._id,
    });
    if (!job)
      return res.status(404).json({ success: false, error: "Job not found" });

    // Retrieve applications with candidate and resume information
    const apps = await Application.find({ job: job._id })
      .populate("candidate", "name email")
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

    // Find application and populate related job
    const app = await Application.findById(req.params.id).populate("job");
    if (!app)
      return res
        .status(404)
        .json({ success: false, error: "Application not found" });

    // Verify employer owns the job for this application
    const company = await Company.findOne({ owner: req.user._id });
    if (!company || app.job.company.toString() !== company._id.toString())
      return res.status(403).json({ success: false, error: "Forbidden" });

    // Update and save application status
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
