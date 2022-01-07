const router = require("express").Router();

// jwt authentication
const { userVerify } = require("../util/verify");

// Controllers
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

// register user and create a profile
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

// update user (jwt verification required)
router.post("/update", userVerify, updateUser);

// delete user and profile (jwt verification required)
router.post("/delete", userVerify, deleteUser);

module.exports = router;
