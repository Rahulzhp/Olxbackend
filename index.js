const express=require("express");
const cors=require("cors")
const {connection}=require("./Config/db")
const {UserRouter}=require("./Router/olx.router")



const app=express()
app.use(express.json());
app.use(cors())

app.use("/user",UserRouter)

app.get("/",(req,res)=>{
    res.send("Welcome home page")
})

app.listen(4500,async ()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(er){
        console.log("er")
    }
    console.log("server is connected to port 4500")
})
