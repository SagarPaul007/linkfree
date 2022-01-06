const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: String, required: true },
  hobbies: { type: [String] },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = { Profile };
