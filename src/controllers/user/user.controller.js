const bcrypt = require("bcrypt");
const { User, registerUser, findUser } = require("../../models/user.model");

async function httpPostRegisterUser(req, res) {
  console.log(req.body);
  const { username, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    res.render("pages/register", {
      caution: "Confirm password must same as your password",
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
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function httpPostLogin(req, res) {
  const { username, password } = req.body;
  const user = await findUser({ username });
  try {
    if (user === null) {
      res.render("pages/login", {
        caution: "incorrect username or password.",
      });
    } else {
      const hashed = user.password;
      const compareResult = bcrypt.compareSync(password, hashed);
      if (compareResult) {
        res.redirect("/");
      } else {
        res.render("pages/login", {
          caution: "incorrect username or password.",
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  httpPostRegisterUser,
  httpPostLogin,
};
