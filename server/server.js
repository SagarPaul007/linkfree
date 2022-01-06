const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// routers
const userRouter = require("./routers/user");
const profileRouter = require("./routers/profile");

// models
const { User } = require("./models/user");

// database connection
mongoose.connect(
  "mongodb://localhost:27017/test",
  () => {
    console.log("connected!");
  },
  (e) => console.log(e)
);

// middlewares
app.use(bodyParser.json());
app.use(userRouter);
app.use(profileRouter);

// User.create({ name: "John", age: 50 }, (err, res) => {
//   if (err) throw err;
//   console.log(res);
// });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening on port " + port));
