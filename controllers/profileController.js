const User = require('../models/User');

async function update(req, res, next) {
  try {
    const { name, location, profile } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (location !== undefined) updates.location = location;
    if (profile !== undefined) updates.profile = profile;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ success: true, data: user.toJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = { update };
