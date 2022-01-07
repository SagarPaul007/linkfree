const router = require("express").Router();

// jwt authentication
const { profileVerify, userVerify } = require("../util/verify");

// controllers
const { getProfile, updateProfile } = require("../controllers/profile");

// GET user and profile
router.get("/:username", profileVerify, getProfile);

// update profile
router.post("/update", userVerify, updateProfile);

module.exports = router;
