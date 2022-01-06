const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// user model
const { User } = require("../models/user");
const { Profile } = require("../models/profile");

// register user and profile

router.post("/api/register", async (req, res) => {
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 8);
  const userObj = { ...req.body, password: hashedPassword };

  try {
    const user = await new User(userObj);
    const profile = await new Profile({ userId: user._id });
    user.profileId = profile._id;
    await profile.save();
    await user.save();
    res.send({ status: "Ok", message: "User and Profile created!" });
  } catch (err) {
    res.send({ status: "Error", message: err.message });
  }
});

// login

router.post("/api/login", async (req, res) => {
  const user = req.body;
  res.send({ status: "Ok", response: user });
});

// update user

// delete user and profile

module.exports = router;
