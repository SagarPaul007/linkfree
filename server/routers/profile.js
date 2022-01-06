const router = require("express").Router();

// jwt authentication
const verify = require("../util/verify");

// model
const { User } = require("../models/user");
const { Profile } = require("../models/profile");

// GET user and profile
router.get("/:username", verify, (req, res) => {
  const username = req.params.username;
  let permissions = false; // true if token matches with the user

  //   finding user with the given username
  User.findOne({ username }, (err, user) => {
    if (err)
      return res.status(404).send({ status: "Error", message: err.message });

    if (!user) {
      res.status(404).send({ status: "Error", message: "User not found" });
    } else {
      const userId = user._id;
      if (userId && userId == req.user?.id) {
        permissions = true;
      }
      // getting profile
      Profile.findOne({ userId }, (err, profile) => {
        if (err)
          return res
            .status(404)
            .send({ status: "Error", message: "User profile not found!" });

        res.status(200).send({ status: "OK", data: { permissions, profile } });
      });
    }
  });
});

// update profile

module.exports = router;
