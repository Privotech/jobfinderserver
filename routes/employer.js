const express = require("express");
const {
  getCompany,
  updateCompany,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getApplications,
  updateApplicationStatus,
} = require("../controllers/employerController");
const { roleMiddleware } = require("../middlewares/role");

const router = express.Router();

router.use(roleMiddleware("employer"));

router.get("/company", getCompany);
router.put("/company", updateCompany);
router.get("/jobs", getJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);
router.get("/jobs/:jobId/applications", getApplications);
router.put("/applications/:id/status", updateApplicationStatus);

module.exports = router;
