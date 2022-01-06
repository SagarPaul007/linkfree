const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const JWT = process.env.JWT_SECRET_KEY;

module.exports = JWT;
