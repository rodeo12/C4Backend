const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
   " name ": {type:String,required:true},
"email" : {type:String,required:true,unique:true},
"gender" : {type:String,required:true},
"password" : {type:String,required:true,unique:true},
"age ": {type:Number,required:true},
"city" : {type:String,required:true},
"is_married" : {type:Boolean,required:true}
})

const userModel= mongoose.model("cloud",userSchema)

module.exports={
    userModel
}