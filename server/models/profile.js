const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  skills: { type: [] },
  projects: { type: [] },
  socials: { type: [] },
  hobbies: { type: [] },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = { Profile };
