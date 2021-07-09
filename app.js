const express = require("express")
const bodyParser = require("body-parser")
const { urlencoded } = require("express")
const db = require("./database.js")
const  PORT = 5000 || process.env.PORT


const app = express()
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("Hello world")
});

app.post("/register",(req,res)=>{
    db.register(req.body.name,req.body.email,req.body.password,req.body.age,function(error,call_back){
        if(error){
            console.log(error)
        }else{
            console.log(`CB : ${call_back}`)
        }
    })
    res.send("Registered")
});


app.post("/login",(req,res)=>{
    db.login(req.body.email,req.body.password,function(error,authe){
        if(error){
            console.log(`Error : ${error}`)
        }else{
            console.log(`Login : ${authe}`)
        }
    })
    res.send("done")
});





app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})
