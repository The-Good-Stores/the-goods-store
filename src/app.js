// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna

const express = require("express");
const app = express();
const passport = require("passport");
const strategy = require("./config/local");
const router = require("./routes/api.router");
const session = require("express-session");

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:4200", "https://used-good-store.vercel.app"],
  })
);
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", router);
app.use("/", (req, res) => {
  res.send("Used Good Store API");
});

module.exports = app;
