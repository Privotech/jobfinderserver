const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: String,
  location: String,
  salaryMin: Number,
  salaryMax: Number,
  employmentType: { type: String, enum: ['full_time', 'part_time', 'contract', 'internship', 'temporary'], default: 'full_time' },
  tags: [String],
  skills: [String],
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  isHidden: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Job', jobSchema);
