// const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport");
const router = require("./routes/router");
const userRouter = require("./routes/user.router");
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
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/", router);
app.use("/user", userRouter)

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

module.exports = app;
