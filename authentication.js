const User = require("./user")
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const CustomStrategy = require("passport-custom").Strategy;
const bcrypt = require("bcrypt")


module.exports = function(passport){

    passport.use(User.createStrategy());
    passport.serializeUser(function(user, done) {
      console.log("SerializeUser : "+user)
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          console.log("DeserializeUser : "+id)
          done(err, user);
        });
      });
    
    
  
    
    
    
    
    //![Better comments extension] : Google Oauthetication starts here 
    
    
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/home",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile)
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    
    
    

    
    //![Better comments extension] : Google Oauthetication ends here
    
    
    //?[Better comments extension] : Facebook Oauthetication starts here
    
    passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/home"
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile)
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    
    //?[Better comments extension] : Facebook Oauthetication ends here
    
    
    
    
    //TODO[Better comments extension] : Local Oauthetication starts here
    
    
    passport.use(new LocalStrategy({usernameField: 'email',passwordField: 'password'},function(email, password, done) {
          User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false);
            }else{
              bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                  done(err)
                }else{
                  if(result){
                    return done(null, user);
                  }else{
                    return done(null, false);
                  }
                }
            });
            }
          });
        }
    ))

    
    //TODO[Better comments extension] : Local Oauthetication ends here


// Custom authentication starts here 



passport.use("custom",new CustomStrategy(
  function(req, done) {
    console.log("Custom_req.body : "+req.body)
    User.findOne({
      googleId: req.body.googleId
    },async function (err, user) {
      if(err){
        console.log(err)
        done(err,false)
      }else{
        if(user){
          console.log(user)
          done(err,user)
        }else{
          const newUser = new User({
            googleId:req.body.googleId,
          })
          const new_user = await newUser.save()
          console.log(newUser)
          console.log(new_user)
          done(err,new_user)
        }
      }
    });
  }
));






// Custom authentication ends here




}