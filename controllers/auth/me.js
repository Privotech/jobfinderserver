async function me(req, res, next) {
  try {
    res.json({ success: true, data: req.user.toJSON() });
  } catch (err) {
    next(err);
  }
}

module.exports = { me };
