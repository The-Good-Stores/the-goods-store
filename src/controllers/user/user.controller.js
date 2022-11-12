const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, registerUser, findUser } = require("../../models/user.model");

async function httpGetLogout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function httpPostRegisterUser(req, res) {
  console.log(req.body);
  const { username, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    res.render("pages/register", {
      caution: "Confirm password must same as your password",
      user: req.user,
    });
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);
      const userToSave = new User(username, email, hashed);
      const same = await findUser({ username });
      if (same != null) {
        res.render("pages/register", {
          caution: "username already existed, try using different username.",
          user: req.user,
        });
      } else {
        const registerResult = await registerUser(userToSave);
        if (registerResult) {
          console.log(`user ${username} added into the database`);
          res.redirect("/");
        } else {
          console.log("Some Error occured.");
          res.render("pages/register", {
            caution: "Something wrong, please try again later.",
            user: req.user,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function httpPostLogin(req, res, next) {
  console.log(req.body);
  passport.authenticate("local", {
    successRedirect: req.session.url || "/",
    failureRedirect: "/login",
  })(req, res, next);
  delete req.session.url;
}
module.exports = {
  httpPostRegisterUser,
  httpPostLogin,
  httpGetLogout,
};
