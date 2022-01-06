const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
