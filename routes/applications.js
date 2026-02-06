const express = require("express");
const {
  apply,
  my,
  getOne,
  withdraw,
} = require("../controllers/applicationsController");

const router = express.Router();

router.post("/", apply);
router.get("/", my);
router.get("/:id", getOne);
router.delete("/:id", withdraw);

module.exports = router;
