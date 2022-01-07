const jwt = require("jsonwebtoken");
const JWT = require("./variable");

function profileVerify(req, res, next) {
  const token = req.header("auth-token");
  if (token) {
    try {
      const verified = jwt.verify(token, JWT);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send({ status: "Error", message: err.message });
    }
  } else {
    next();
  }
}

function userVerify(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ status: "Error", message: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, JWT);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ status: "Error", message: err.message });
  }
}

module.exports = { profileVerify, userVerify };
