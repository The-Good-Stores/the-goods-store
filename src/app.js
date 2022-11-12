// const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");
const router = require("./routes/router");
const userRouter = require("./routes/user.router");
const adsRouter = require("./routes/ads.router");
const session = require("express-session");
const strategy = require("./config/local");

// const cors = require("cors");
// const morgan = require("morgan");
// app.use(
//   cors({
//     origin: "http://localhost:4200",
//   })
// );
// app.use(morgan("tiny"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "sessionSecret",
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
app.use("/user", userRouter);
app.use("/ads", adsRouter);

module.exports = app;
