const jwt = require("jsonwebtoken");
const JWT = require("./variable");

function verify(req, res, next) {
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

module.exports = verify;
