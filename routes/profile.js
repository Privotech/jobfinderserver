const express = require("express");
const { update } = require("../controllers/profileController");

const router = express.Router();

router.put("/", update);

module.exports = router;
