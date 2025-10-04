const express = require("express");
const { login, register, logout } = require("../controllers/authController");
const { requireGuest } = require("../middlewares/auth");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", requireGuest, login);
router.post("/register", requireAuth, register);
router.post("/logout", logout);

module.exports = router;
