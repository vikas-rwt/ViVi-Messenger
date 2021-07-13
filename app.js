const express = require("express")
const bodyParser = require("body-parser")
const { urlencoded } = require("express")
const db = require("./database.js")
const mongoose = require("mongoose")
const  PORT = 5000 || process.env.PORT
const session = require('express-session')
const passport = require("passport")
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate')
const cors = require('cors')
const flash = require('connect-flash');
const bcrypt = require("bcrypt")
const User = require("./user")

const app = express()


//![Better comments extension] : Middlewares ends here
app.use(cors({  
  origin:"http://localhost:3000",
  credentials:true
  }
))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(cookieParser(process.env.SECRET))
app.use(passport.initialize());
app.use(passport.session())
require("./authentication")(passport);

//![Better comments extension] : Middlewares ends here where's the device section ?


//TODO[Better comments extension] : Mongoose details starts here

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true ,useUnifiedTopology:true})
mongoose.set("useCreateIndex",true);


//TODO[Better comments extension] :   Mongoose details ends here


// Home page route starts here

app.get("/isAuth",(req,res)=>{
    // console.log(req.sessionID)
    if(req.isAuthenticated()){
      console.log("User authenticated")
      res.json({
        status:true,
        message:"user is authenticated already"
      })
    }else{
      console.log("User isn\'t authenticated")
      res.json({
        status:false,
        message:"user isn't authenticated"
      })
    }
});

// Home page route ends here


// Register route starts here

app.route("/register")
    .get((req,res)=>{
        res.sendFile(__dirname+"/register.html")
    })
    .post((req,res)=>{
      User.findOne({email:req.body.email},(err,doc)=>{
        if(err){
          console.log(err)
        }else{
          if(doc){
            res.send("Account already exist")
          }else{
            if(!doc){
              bcrypt.hash(req.body.password, 10,async function(err, hash) {
                if(err){
                  console.log(err)
                }else{
                  const newUser = new User({
                    email:req.body.email,
                    password:hash
                  })
                  await newUser.save()
                  res.send("Account created")
                }
            });
            }
          }
        }
      })
    })

// Register route ends here


// Login route starts here

app.route("/login")
    .get((req,res)=>{
        res.send("You failed")
    })
    .post((req,res)=>{
      console.log(req.body)
      passport.authenticate("local",(err,user,info)=>{
        if(err) throw err;
        if(!user) res.send("No user found");
        else{
          if(user){
            console.log(user)
            req.logIn(user,err =>{
              if(err) throw err;
              res.json({
                status:true,
                message:"Successfully authenticated"
              })
              console.log("req.user = "+req.user)
          })
          }
        }
      })(req,res);
    })


// Login route ends here wait pushing itok

//Google login starts here

app.post("/auth/register",(req,res)=>{
  passport.authenticate("custom",(err,user,info)=>{
    if(err){
      console.log(err)
    }else{
      console.log("POST : "+user)
      if(!user){
        console.log("User not found")
      }else{
        console.log(user)
        req.logIn(user,err =>{
          if(err) throw err;
          res.json({
            status:true,
            message:"Successfully authenticated"
          })
          console.log("req.user = "+req.user)
      })
      }
    }
  })(req,res);
}
)



// Google login ends here


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})

