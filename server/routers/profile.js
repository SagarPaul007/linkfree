const router = require("express").Router();

// jwt authentication
const { profileVerify, userVerify } = require("../util/verify");

// model
const { User } = require("../models/user");
const { Profile } = require("../models/profile");

// GET user and profile
router.get("/:username", profileVerify, (req, res) => {
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

router.post("/update", userVerify, async (req, res) => {
  const data = req.body;

  try {
    // getting user
    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.send({ status: "Error", message: "User not found!" });

    // getting user profile
    const profile = await Profile.findOne({ _id: user.profileId });
    if (!profile)
      return res.send({ status: "Error", message: "Profile not found!" });

    await profile.updateOne(data);
    res.status(200).send({ status: "OK", message: "Profile updated" });
  } catch (err) {
    res.send({ status: "Error", message: err.message });
  }
});

module.exports = router;
