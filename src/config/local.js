const LocalStrategy = require("passport-local");
const usersDb = require("../models/user.mongo");
const bcrypt = require("bcrypt");
const strategy = new LocalStrategy(function (username, password, done) {
  // function of username, password, done(callback)
  // look for the user data
  usersDb.findOne({ username: username }, function (err, user) {
    // if there is an error
    if (err) {
      return done(err);
    }
    // if user doesn't exist
    if (!user) {
      return done(null, false, { message: "User not found." });
    }
    // if the password isn't correct
    const compareResult = bcrypt.compareSync(password, user.password);
    if (!compareResult) {
      return done(null, false, {
        message: "Invalid password.",
      });
    }
    // if the user is properly authenticated
    return done(null, user);
  });
});

module.exports = strategy;
