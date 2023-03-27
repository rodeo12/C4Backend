const jwt= require("jsonwebtoken")

const authenticate= (req,res,next)=>{
    const token= req.headers.authotization;

    if(token){
        jwt.verify(token,"mayank",(err,decoded)=>{
            if(decoded){
                req.body.device=decoded.User
                next()
            }else{
                res.send({"msg":"Wrong Token Generated"})
            }
        })
    }
    else{
        res.send("Please Login ")
    }
}

module.exports={
    authenticate
}