const { registerUser, User } = require("../../models/user.model");
const bcrypt = require("bcrypt");

export async function httpPostRegisterUser(req, res) {
  const password = req.body.password;
  bcrypt.hash(password, 10, function (err, hash) {
    hashed_password = hash;
  });
  const user = new User(req.body.username, req.body.email, hashed_password);
  try {
    await registerUser(user);
    res.redirect("/");
  } catch (error) {
    res.status(404).json(error);
  }
}

