const express= require("express")
const app= express()
app.use(express.json())
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken");
const { userModel } = require("../Models/user.model");
const userRouter=express.Router() ;



userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}= req.body 

    try{
       const user= await userModel.find({email})
       if(user.length==0){
        bcrypt.has(passwod,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"Something went wrong",err:err.message})
            }else{
                const user= new userModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send({"msg": "Data added to the database"})
            }
        })
       }else{
        res.send( "User already exist, please login")
       }
    }
    catch(err){
       res.send({"msg":"Something Wrong"})
    }
})

userRouter.post("/login",async(req,res)=>{
   
    const{email,password}= req.body 

    try{
     const user = await userModel.find({email})

     if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
        if(result){
            const token=jwt.sign({email:email,User:user[0]._id},"mayank")
            res.send({"msg":"Logged in Successfully"})
        }else{
            res.send({"msg":"Something went wrong"})
        }
        })
     }else{
        res.send("Wrong Credentials")
     }
    }
    catch(err){
      res.send("Something went wrong")
    }

})

   module.exports={
    userRouter
   }