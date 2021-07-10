const express = require("express")
const bodyParser = require("body-parser")
const { urlencoded } = require("express")
const db = require("./database.js")
const mongoose = require("mongoose")
const  PORT = 5000 || process.env.PORT
const session = require('express-session')
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const cookieParser = require('cookie-parser')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate')

const app = express()


//![Better comments extension] : Middlewares ends here

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session())


//![Better comments extension] : Middlewares ends here


//TODO[Better comments extension] : Mongoose details starts here

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true ,useUnifiedTopology:true})
mongoose.set("useCreateIndex",true);
const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    username:String,
    age:String,
    googleId:String,
    facebookId:String

})




userSchema.plugin(passportLocalMongoose,{ usernameField : 'email' });
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User",userSchema)



passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


//TODO[Better comments extension] :   Mongoose details ends here




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



app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
  );
app.get('/auth/google/home', passport.authenticate('google', { failureRedirect: '/login' }),function(req, res) {
    res.redirect('/');
});


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

app.get('/auth/facebook',passport.authenticate('facebook'));

app.get('/auth/facebook/home',passport.authenticate('facebook', { failureRedirect: '/login' }),function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


//?[Better comments extension] : Facebook Oauthetication ends here




//TODO[Better comments extension] : Twitter Oauthetication starts here





//TODO[Better comments extension] : Twitter Oauthetication ends here

// Home page route starts here

app.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/home.html")
    }else{
        console.log("You are not logged in")
        res.sendFile(__dirname+"/login.html")
    }
});

// Home page route ends here


// Register route starts here

app.route("/register")
    .get((req,res)=>{
        res.sendFile(__dirname+"/register.html")
    })
    .post((req,res)=>{
        console.log(req.body)
        User.register({username:req.body.username,email:req.body.email,age:req.body.age},req.body.password,function(err,user){
            if(err){
                console.log(err);
                return res.render("register");
            }else{
                passport.authenticate("local")(req, res, function(){
                    console.log("Done ")
                    res.redirect("/");
                });
            }
        })
    })

// Register route ends here


// Login route starts here

app.route("/login")
    .get((req,res)=>{
        res.sendFile(__dirname+"/login.html")
    })
    .post((req,res)=>{
        const user = new User({
            email:req.body.email,
            password:req.body.password
        })
        console.log(" LOGIN : "+user)
        req.login(user,function(err){
            if(err){
                console.log("Error : "+err)
            }else{
                passport.authenticate("local")(req, res, function(){
                    console.log("Done ")
                    res.redirect("/");
                });
            }
        })
    });


// Login route ends here

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})

