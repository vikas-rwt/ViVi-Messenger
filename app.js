const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 5000 || process.env.PORT;
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./user");
const app = express();

//![Better comments extension] : Middlewares ends here
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./authentication")(passport);

//![Better comments extension] : Middlewares ends here where's the device section ?

//TODO[Better comments extension] : Mongoose details starts here

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

//TODO[Better comments extension] :   Mongoose details ends here

// Home page route starts here pubg/india.com

app.get("/isAuth", (req, res) => {
  // console.log(req.sessionID)
  if (req.isAuthenticated()) {
    res.json({
      status: true,
      message: "user is authenticated already",
    });
  } else {
    res.json({
      status: false,
      message: "user isn't authenticated",
    });
  }
});

// Home page route ends here

// Register route starts here

app
  .route("/register")
  .get((req, res) => {
    res.sendFile(__dirname + "/register.html");
  })
  .post((req, res) => {
    User.findOne({ email: req.body.email }, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        if (doc) {
          res.json({
            type: "register",
            status: false,
            message: "Account already exist",
          });
        } else {
          if (!doc) {
            bcrypt.hash(req.body.password, 10, async function (err, hash) {
              if (err) {
                console.log(err);
              } else {
                const newUser = new User({
                  username: req.body.username,
                  age: req.body.age,
                  email: req.body.email,
                  password: hash,
                });
                await newUser.save();
                res.json({
                  type: "register",
                  status: true,
                  email: req.body.email,
                  message: "account registered successfully",
                });
              }
            });
          }
        }
      }
    });
  });

// Register route ends here

// Login route starts here

app
  .route("/login")
  .get((req, res) => {
    res.send("You failed");
  })
  .post((req, res) => {
    passport.authenticate("local", (err, user, password) => {
      if (err) throw err;
      if (!user) res.send("No user found");
      else {
        if (password) {
          if (user) {
            console.log(user);
            req.logIn(user, (err) => {
              if (err) throw err;
              res.json({
                status: true,
                message: "Successfully authenticated",
              });
            });
          }
        } else {
          res.json({
            status: false,
            message: "password incorrect",
            type: "password",
          });
        }
      }
    })(req, res);
  });

// Login route ends here wait pushing itok

//Google login starts here

app.post("/auth/register", (req, res) => {
  passport.authenticate("customRegister", (err, user, info) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.json({
          status: false,
          message: "user not found",
        });
      } else {
        console.log(user);
        req.logIn(user, (err) => {
          if (err) throw err;
          res.json({
            status: true,
            message: "Successfully authenticated",
          });
        });
      }
    }
  })(req, res);
});

// Google login ends here

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
