const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, registerUser, findUser } = require("../../models/user.model");

async function httpApiGetLogout(req, res, next) {
    console.log(req.user);
  req.logout(function (err) {
    if (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err,
      });
    }
    res.status(200).json({
      status: "success",
    });
  });
}

async function httpApiPostRegisterUser(req, res) {
  console.log(req.body);
  const { username, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    res.status(400).json({
      status: "failed",
      message: "Confirm password must same as your password",
    });
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);
      const userToSave = new User(username, email, hashed);
      const same = await findUser({ username });
      if (same != null) {
        res.status(400).json({
          status: "failed",
          message: "username already existed, try using different username.",
        });
      } else {
        const registerResult = await registerUser(userToSave);
        console.log(registerResult);
        if (registerResult) {
          console.log(`user ${username} added into the database`);
          res.status(200).json({
            status: "success",
          });
        } else {
          console.log("Some Error occured.");
          res.status(400).json({
            status: "failed",
            message: "Some Error occured",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

async function httpApiPostLogin(req, res, next) {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.json({
        success: false,
        status: "Login Unsuccessful",
      });
    }
    req.login(user, (err) => {
      if (err) {
        next(err);
      }
      res.json({ success: true, status: "Login Successfully" });
    });
  })(req, res, next);
}
module.exports = {
  httpApiPostRegisterUser,
  httpApiPostLogin,
  httpApiGetLogout,
};
