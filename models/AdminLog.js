const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: { type: String, required: true },
    targetType: String,
    targetId: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminLog', adminLogSchema);
