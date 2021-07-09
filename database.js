require('dotenv').config()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true ,useUnifiedTopology:true})
mongoose.connection.on("connected",()=>{
    console.log("Mongodb connected to atlas cloud successfully...")
})

userSchema = {
    "email":String,
    "password":String,
    "fullName":String,
    "age":Number,
}
userDetails = mongoose.model("user_details",userSchema)

exports.login = (user_email,user_password,cb)=>{
    console.log(user_email,user_password)
    userDetails.find({email:user_email},(error,foundItems)=>{
        if(error){
            console.log(err)
            return status=501
        }else{
            if(foundItems.length === 0){
                cb(false)
                return 
            }else{
                bcrypt.compare(user_password, foundItems[0].password, function(err, result) {
                    if(err){
                        console.log(err)
                        return status=501
                    }else{
                        console.log(`Result : ${result}`)
                        cb(null,result)
                    }
            });
            }

        }
    })

}

exports.register = (user_name,user_email,user_password,user_age,cb)=>{
    bcrypt.hash(user_password, 10, function(err, hash) {
        userDetails.insertMany({fullName:user_name,email:user_email,password:hash,age:user_age},(err)=>{
            if(err){
                console.log(err)
                cb(err)
            }else{
                console.log("Successfully inserted into the Database")
                cb(null,"Registered")
            }
        })
    });
}