const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  coverLetter: String,
  status: { type: String, enum: ['applied', 'under_review', 'interviewed', 'rejected', 'hired'], default: 'applied' },
}, { timestamps: true });
module.exports = mongoose.model('Application', applicationSchema);
