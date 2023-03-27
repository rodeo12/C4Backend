const express= require("express")
const app= express()
app.use(express.json())
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken");
const { postModel } = require("../Models/post.model");
const postRouter=express.Router() ;

postRouter.get("/",async(req,res)=>{
const token =req.headers.authorization

if(token){
jwt.verify(token,"mayank",async(err,decoded)=>{
    if(decoded){
        const post = await postModel.find({device:decoded.cloud})
        res.send(post)
    }else{
        res.send({"msg": "Wrong token"})
    }
})
}else{
    res.send("Login first")
}
})

postRouter.post("/add",async(req,res)=>{
    try{
        const payload=req.body;
        const newpost= await postModel(payload)
        newpost.save()
        res.setDefaultEncoding({"msg":"new post created"})
    }
    catch(err){
        res.send({"msg":"Something went wrong"})
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
 try{
    const id= req.params.id;
    const payload=req.body;

    await postModel.findByIdAndUpdate(id,payload)
    res.send({"msg":"Data Updated"})
 }
 catch(err){
    res.send({"msg":"Something Went Wrong"})
 }

})

postRouter.delete("/delete/:id",async(req,res)=>{
    const postID=req.params.id;
    await postModel.findByIdAndDelete({_id:postID})
    res.send({"msg":"Data deleted"})

   })

   module.exports={
    postRouter
   }
