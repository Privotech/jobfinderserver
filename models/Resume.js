const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filePath: { type: String, required: true },
    originalName: { type: String, required: true },
    parsedSkills: [String],
    yearsOfExperience: Number,
    jobTitles: [String],
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
