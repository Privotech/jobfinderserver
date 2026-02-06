const express = require("express");
const { jobs } = require("../controllers/recommendationsController");

const router = express.Router();

router.get("/jobs", jobs);

module.exports = router;
