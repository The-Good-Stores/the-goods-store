const userDb = require("./user.mongo");

export class User {
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
export async function findUser(username) {
  const user = await userDb.findOne({ username });
  console.log(user);
  return user;
}

//Register 
export async function registerUser(user) {
  const filter = { username: user.username };
  const user = await findUser(filter);
  if (user != null) {
    const userToSave = new User(user.username, user.email, user.password);
    try {
      await userDb.findOneAndUpdate(filter, userToSave, { upsert: true });
      console.log("user registered");
    } catch (error) {
      console.log(error);
    }
  }
}
