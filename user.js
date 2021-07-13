const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    username:String,
    age:String,
    googleId:String,
    facebookId:String

})

userSchema.plugin(passportLocalMongoose,{ usernameField : 'email' });
module.exports = mongoose.model("User",userSchema)