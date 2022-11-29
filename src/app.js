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
const router = require("./routes/router");
const strategy = require("./config/local");
const apiRouter = require("./routes/api.router");
const session = require("express-session");

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:4200", "https://used-good-store.vercel.app"],
  })
);
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
app.use("/api", apiRouter);

module.exports = app;
