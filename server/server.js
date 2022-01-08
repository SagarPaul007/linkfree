const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

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
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", userRouter);
app.use("/profile", profileRouter);

app.use("*", (req, res) => {
  res.send("<h1>Server Error</h1>");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("listening on port " + port));
