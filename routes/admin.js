const express = require("express");
const {
  summary,
  getUsers,
  banUser,
  getJobs,
  hideJob,
} = require("../controllers/adminController");
const { roleMiddleware } = require("../middlewares/role");

const router = express.Router();

router.use(roleMiddleware("admin"));

router.get("/summary", summary);
router.get("/users", getUsers);
router.put("/users/:id/ban", banUser);
router.get("/jobs", getJobs);
router.put("/jobs/:id/hide", hideJob);

module.exports = router;
