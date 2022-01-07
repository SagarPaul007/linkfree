const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// secret key and jwt authentication
const JWT = require("../util/variable");
const { userVerify } = require("../util/verify");

// user model
const { User } = require("../models/user");
const { Profile } = require("../models/profile");

// register user and create a profile

router.post("/register", async (req, res) => {
  const { username, password, name, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    // checking if username is used
    const user = await User.findOne({ username });
    if (user)
      return res.send({ status: "Error", message: "User already exists" });

    // creating user
    const savedUser = await User.create({ username, password: hashedPassword });
    const userId = savedUser._id;
    const profile = await Profile.create({ name, email, userId });
    savedUser.profileId = profile._id;
    savedUser.save();
    res.send({ status: "Ok", message: "User saved successfully" });
  } catch (err) {
    res.send({ status: "Error", message: err.message });
  }
});

// login

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user)
    return res.send({
      status: "Error",
      message: "Invalid usename",
    });
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = jwt.sign({ id: user._id }, JWT);
    res.send({ status: "Success", message: "Logged in successfully", token });
  } else {
    res.send({ status: "Error", message: "Invalid password" });
  }
});

// update user (jwt verification required)

router.post("/update", userVerify, async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const userId = req.user?.id;
    const user = await User.findOne({ _id: userId });
    if (!user) return res.send({ status: "Error", message: "no user" });

    // updating data
    user.username = username;
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .send({ status: "Ok", message: "user updated successfully" });
  } catch (err) {
    res.send({ status: "Error", message: err.message });
  }
});

// delete user and profile (jwt verification required)

module.exports = router;
