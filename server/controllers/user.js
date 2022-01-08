const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// secret key
const JWT = require("../util/variable");

// user model
const { User } = require("../models/user");
const { Profile } = require("../models/profile");

// Register, Login, Update, Delete user

const registerUser = async (req, res) => {
  const { username, password, name, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    // checking if username is used
    const user = await User.findOne({ username });
    if (user)
      return res.send({ status: "error", message: "User already exists" });

    // creating user
    const savedUser = await User.create({ username, password: hashedPassword });
    const userId = savedUser._id;

    // creating profile
    const profile = await Profile.create({ name, email, userId });
    savedUser.profileId = profile._id;
    savedUser.save();
    res.send({ status: "ok", message: "User saved successfully" });
  } catch (err) {
    res.send({ status: "error", message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();
  if (!user)
    return res.send({
      status: "error",
      message: "Invalid usename",
    });

  // checking password
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const token = jwt.sign({ id: user._id }, JWT); // jwt auth token
    res.send({ status: "ok", message: "Logged in successfully", token });
  } else {
    res.send({ status: "error", message: "Invalid password" });
  }
};

const updateUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const userId = req.user?.id;
    const user = await User.findOne({ _id: userId });
    if (!user) return res.send({ status: "error", message: "no user" });

    // updating data
    user.username = username;
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .send({ status: "ok", message: "user updated successfully" });
  } catch (err) {
    res.send({ status: "error", message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { password } = req.body;
  const userId = req.user?.id;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.send({ status: "error", message: "no user" });

    // checking password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // if password matched remove user and profile
      const profile = await Profile.findOne({ _id: user.profileId });
      await user.remove();
      await profile.remove();
      res
        .status(200)
        .send({ status: "ok", message: "User deleted successfully" });
    } else {
      res.status(401).send({ status: "error", message: "Invalid password" });
    }
  } catch (err) {
    res.send({ status: "error", message: err.message });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser };
