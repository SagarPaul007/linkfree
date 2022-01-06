const express = require("express");
const router = express.Router();

// model
const { User } = require("../models/user");
const { Profile } = require("../models/profile");

// GET user and profile
router.get("/:username", (req, res) => {
  const username = req.params.username;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(404).send({ status: "Error", message: err.message });
    } else {
      const userId = user._id;
      Profile.findOne({ userId }, (err, profile) => {
        res.status(200).send({ status: "OK", user, profile });
      });
    }
  });
});

// update profile

module.exports = router;
