const express = require("express");
const {
  my,
  upload,
  remove,
  setPrimary,
} = require("../controllers/resumesController");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.get("/", my);
router.post("/", uploadMiddleware.single("resume"), upload);
router.delete("/:id", remove);
router.put("/:id/primary", setPrimary);

module.exports = router;
