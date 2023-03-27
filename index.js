const express= require ("express")
const app = express()
app.use(express.json())
require("dotenv").config()


const cors= require("cors")
app.use(cors())


const{connection} = require("./Config/config")
const{userRouter}= require("./Routes/user")
const{postRouter}= require("./Routes/post") 
const{auth}= require("./Middleware/autheticate")
app.use("/users",userRouter)
app.use("/post",postRouter)
app.use(auth)

app.listen(process.env.port,async()=>{
try{
await connection
console.log("Connected to Db")
}
catch(err){
 console.log(err.message)
}
console.log(`Server is running at Port ${process.env.port}`)
})