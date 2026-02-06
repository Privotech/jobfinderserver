const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: String,
  website: String,
  description: String,
  locations: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
module.exports = mongoose.model('Company', companySchema);
