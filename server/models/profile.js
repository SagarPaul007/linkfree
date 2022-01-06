const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hobbies: { type: [String] },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = { Profile };
