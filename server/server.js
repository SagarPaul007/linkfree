const express = require("express");
const mongoose = require("mongoose");

const app = express();

// routers
const userRouter = require("./routers/user");
const profileRouter = require("./routers/profile");

// database connection
mongoose.connect(
  "mongodb://localhost:27017/test",
  () => {
    console.log("connected to DB!");
  },
  (e) => console.log(e)
);

// Middlewares
app.use(express.json());

// Routes
app.use("/api", userRouter);
app.use(profileRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening on port " + port));
