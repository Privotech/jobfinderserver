const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['job_seeker', 'employer', 'admin'], default: 'job_seeker' },
  name: { type: String, required: true },
  location: String,
  profile: {
    headline: String,
    experienceSummary: String,
    skills: [String],
    yearsOfExperience: Number,
    preferredLocations: [String],
    preferredRoles: [String],
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};
module.exports = mongoose.model('User', userSchema);
