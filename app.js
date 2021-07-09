const express = require("express")
const bodyParser = require("body-parser")
const { urlencoded } = require("express")
const db = require("./database.js")
const mongoose = require("mongoose")
const  PORT = 5000 || process.env.PORT
const session = require('express-session')
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")


const app = express()


app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session())

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true ,useUnifiedTopology:true})
mongoose.set("useCreateIndex",true);
const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    username:String,
    age:String

})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User",userSchema)

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        res.sendFile(__dirname+"/home.html")
    }else{
        console.log("You are not logged in")
        res.sendFile(__dirname+"/login.html")
    }
});
app.get("/register",(req,res)=>{
    res.sendFile(__dirname+"/register.html")
})

app.post("/register",(req,res)=>{
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
});


app.post("/login",(req,res)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password
    })
    req.login(user,function(err){
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req, res, function(){
                console.log("Done ")
                res.redirect("/");
            });
        }
    })
});




app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})



// db.register(req.body.name,req.body.email,req.body.password,req.body.age,function(error,call_back){
//     //     if(error){
//     //         console.log(error)
//     //     }else{
//     //         console.log(`CB : ${call_back}`)
//     //     }
//     // })


// db.login(req.body.email,req.body.password,function(error,authe){
//     if(error){
//         console.log(`Error : ${error}`)
//     }else{
//         console.log(`Login : ${authe}`)
//     }
// })
// res.send("done")