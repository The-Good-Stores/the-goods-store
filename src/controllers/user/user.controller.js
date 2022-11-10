const { registerUser, User } = require("../../models/user.model");
const bcrypt = require("bcrypt");

async function httpPostRegisterUser(req, res) {
  const password = req.body.password;
  const hashed = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = new User(req.body.username, req.body.email, hashed);
  const result = await registerUser(user);
  if (result) {
    res.redirect("/")
  }
  else{
    res.redirect("/login")
  }
}

module.exports = {
  httpPostRegisterUser,
};
