const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
