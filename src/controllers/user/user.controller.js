// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna
const bcrypt = require("bcrypt");
const passport = require("passport");
const {
  User,
  registerUser,
  findUser,
  updateProfile,
} = require("../../models/user.model");
const jwt = require("jsonwebtoken");
async function httpApiGetLogout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      res.status(400).json({
        success: false,
        message: err,
      });
    }
    res.status(200).json({
      success: true,
    });
  });
}

async function httpApiPostRegisterUser(req, res, next) {
  console.log(req.body);
  const { username, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    res.status(400).json({
      success: false,
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
          success: false,
          message: "username already existed, try using different username.",
        });
      } else {
        const registerResult = await registerUser(userToSave);
        console.log(registerResult);
        if (registerResult) {
          passport.authenticate("local", (err, user, info) => {
            if (err) {
              next(err);
            }
            if (!user) {
              res.json({
                success: false,
                status: "Login Unsuccessful",
              });
            } else {
              req.login(user, (err) => {
                if (err) return next(err);
                const token = jwt.sign({ user }, process.env.JWT_SECRET);
                res.json({
                  success: true,
                  status: "Register and Login Successfully",
                  token,
                  username: user.username,
                });
              });
            }
          })(req, res, next);
        } else {
          console.log("Some Error occured.");
          res.status(400).json({
            success: false,
            message: "Some Error occured",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        scueess: false,
        message: error.message,
      });
    }
  }
}

async function httpApiPostLogin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      res.json({
        success: false,
        status: "Login Unsuccessful",
      });
    } else {
      req.login(user, (err) => {
        if (err) return next(err);

        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        res.json({
          success: true,
          status: "Login Successfully",
          token,
          username: user.username,
        });
      });
    }
  })(req, res, next);
}

//////// Update Profile

async function httpGetUser(req, res) {
  const username = req.user.username;
  console.log(username);
  const user = await findUser({ username });
  if (user) {
    res.status(200).json({
      succes: true,
      data: user,
    });
  }
}

async function httpPostEditProfile(req, res) {
  const newInfo = { username: req.body.username, email: req.body.email };
  const updated = await updateProfile(req.user.username, newInfo);
  if (updated) {
    res.status(201).json({
      success: true,
      data: updated,
    });
  }
}

module.exports = {
  httpApiPostRegisterUser,
  httpApiPostLogin,
  httpApiGetLogout,
  httpPostEditProfile,
  httpGetUser,
};
