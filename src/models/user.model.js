const userDb = require("./user.mongo");

class User {
  username;
  email;
  password;

  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

//Find user
async function findUser(filter) {
  const user = await userDb.findOne(filter);
  return user;
}

//Register
async function registerUser(user) {
  const filter = { username: user.username };
  const findeduser = await findUser(filter);
  if (findeduser === null) {
    await userDb.create(user);
    console.log("user registered");
    return true;
  } else {
    return false;
  }
}
module.exports = {
  registerUser,
  User,
  findUser,
};
