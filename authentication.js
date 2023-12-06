const User = require("./user");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const CustomStrategy = require("passport-custom").Strategy;
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  passport.use(User.createStrategy());
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  //![Better comments extension] : Google Oauthetication starts here

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOOGLE_CALLBACK_URL,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

  //![Better comments extension] : Google Oauthetication ends here

  //?[Better comments extension] : Facebook Oauthetication starts here

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );

  //?[Better comments extension] : Facebook Oauthetication ends here

  //TODO[Better comments extension] : Local Oauthetication starts here

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          } else {
            bcrypt.compare(password, user.password, function (err, result) {
              if (err) {
                done(err);
              } else {
                if (result) {
                  return done(null, user, true);
                } else {
                  return done(null, user, false);
                }
              }
            });
          }
        });
      }
    )
  );

  //TODO[Better comments extension] : Local Oauthetication ends here

  // Custom authentication starts here

  passport.use(
    "customRegister",
    new CustomStrategy(function (req, done) {
      var provider_id = {};
      console.log("Custom_req.body : " + JSON.stringify(req.body));
      if (req.body.provider === "Google") {
        User.findOne(
          { googleId: req.body.googleId },
          async function (err, user) {
            if (err) {
              done(err, false);
            } else {
              if (user) {
                done(err, user);
              } else {
                if (req.body.type === "register") {
                  const newUser = new User(provider_id);
                  const new_user = await newUser.save();
                  done(err, new_user);
                } else if (req.body.type === "login") {
                  done(err, null);
                }
              }
            }
          }
        );
      } else if (req.body.provider === "Facebook") {
        User.findOne(
          { facebookId: req.body.facebookId },
          async function (err, user) {
            if (err) {
              done(err, false);
            } else {
              if (user) {
                done(err, user);
              } else {
                if (req.body.type === "register") {
                  const newUser = new User(provider_id);
                  const new_user = await newUser.save();
                  done(err, new_user);
                } else if (req.body.type === "login") {
                  done(err, null);
                }
              }
            }
          }
        );
      }
    })
  );

  // Custom authentication ends here
};
