const express = require("express");
const { list, add, remove } = require("../controllers/savedController");

const router = express.Router();

router.get("/", list);
router.post("/", add);
router.delete("/:jobId", remove);

module.exports = router;
