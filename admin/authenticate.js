const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passwordUtil = require("../utils/password");
const userStore = require("./data/user");
const { urls } = require("./config");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    async (request, email, password, done) => {
      try {
        const message = "Invalid email or password";
        const user = await userStore.getByEmail(email);
        const success =
          user && (await passwordUtil.compare(password, user.password));
        if (success) {
          delete user.password;
          done(null, user);
        } else {
          //We need to remember email address
          //in the get("/login") route handler
          //so that user doesn't have to re-enter
          //email address if login failed
          request.flash("email", email);
          done(null, false, { message });
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userStore.getById(id);
    done(null, user);
  } catch (error) {
    done(error);
    console.log(error);
  }
});

module.exports = passport.authenticate("local", {
  successRedirect: urls.home,
  failureRedirect: urls.login,
  failureFlash: true,
  badRequestMessage: "Enter username and password to login"
});
