const Application = require("../models/Application");
const Job = require("../models/Job");

async function apply(req, res, next) {
  try {
    const { jobId, resumeId, coverLetter } = req.body;
    if (!jobId)
      return res.status(400).json({ success: false, error: "jobId required" });

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job || job.isHidden)
      return res.status(404).json({ success: false, error: "Job not found" });

    // Check if already applied
    const existing = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });
    if (existing)
      return res
        .status(400)
        .json({ success: false, error: "Already applied to this job" });

    const app = await Application.create({
      job: jobId,
      candidate: req.user._id,
      resume: resumeId || undefined,
      coverLetter: coverLetter || "",
    });

    res.status(201).json({ success: true, data: app });
  } catch (err) {
    next(err);
  }
}

async function my(req, res, next) {
  try {
    const { status } = req.query;
    const filter = { candidate: req.user._id };
    if (status) filter.status = status;

    const apps = await Application.find(filter)
      .populate("job")
      .populate("resume")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: apps });
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const app = await Application.findById(req.params.id)
      .populate("job")
      .populate("resume")
      .lean();

    if (!app)
      return res
        .status(404)
        .json({ success: false, error: "Application not found" });
    if (app.candidate.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }

    res.json({ success: true, data: app });
  } catch (err) {
    next(err);
  }
}

async function withdraw(req, res, next) {
  try {
    const app = await Application.findById(req.params.id);
    if (!app)
      return res
        .status(404)
        .json({ success: false, error: "Application not found" });
    if (app.candidate.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }

    await Application.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { apply, my, getOne, withdraw };
