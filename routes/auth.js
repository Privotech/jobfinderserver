const express = require("express");
const { register } = require("../controllers/auth/register");
const { login } = require("../controllers/auth/login");
const { me } = require("../controllers/auth/me");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;
