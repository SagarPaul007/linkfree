const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// secret key
const JWT = require("../util/variable");

// user model
const { User } = require("../models/user");
const { Profile } = require("../models/profile");

// register user and create a profile

router.post("/api/register", async (req, res) => {
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

router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user)
    return res.send({
      status: "Error",
      message: "Invalid usename or password",
    });
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = jwt.sign({ id: user._id, username: user.username }, JWT);
    res.send({ status: "Success", message: "Logged in successfully", token });
  } else {
    res.send({ status: "Error", message: "Invalid usename or password" });
  }
});

// update user (jwt verification required)

router.post("/api/update", (req, res) => {});

// delete user and profile (jwt verification required)

module.exports = router;
