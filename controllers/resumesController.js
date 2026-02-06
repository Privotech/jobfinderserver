const Resume = require('../models/Resume');

async function my(req, res, next) {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ isPrimary: -1, createdAt: -1 }).lean();
    res.json({ success: true, data: resumes });
  } catch (e) {
    next(e);
  }
}

async function upload(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No file' });
    const r = await Resume.create({ user: req.user._id, filePath: req.file.path, originalName: req.file.originalname });
    const n = await Resume.countDocuments({ user: req.user._id });
    if (n === 1) await Resume.findByIdAndUpdate(r._id, { isPrimary: true });
    res.status(201).json({ success: true, data: r });
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const r = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!r) return res.status(404).json({ success: false, error: 'Not found' });
    await Resume.findByIdAndDelete(r._id);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

async function setPrimary(req, res, next) {
  try {
    await Resume.updateMany({ user: req.user._id }, { isPrimary: false });
    const r = await Resume.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { isPrimary: true });
    if (!r) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

module.exports = { my, upload, remove, setPrimary };
