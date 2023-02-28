
const express=require("express")

const UserRouter=express.Router()


const {UserModel}=require("../Model/shema");


UserRouter.post("/add", async (req,res)=>{
    let data=req.body;
    try{
        let user= new UserModel(data)
        await user.save()
        res.send("data added")
    }catch(er){
        console.log("er",er)
    }
})

UserRouter.get("/",async(req,res)=>{
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 4;
        const search = req.query.search || "";
        let sort = req.query.sort || "postedAt";
        let category = req.query.category || "All";

        const genreOptions = [
            "Clothing", "Electronics", "Furniture", "Other"
        ];

        category==="All" ? (category=[...genreOptions]) : (category=req.query.category.split(","));

        req.query.sort ? (sort=req.query.sort.split(",")) : (sort=[sort])

        let sortBy = {};
        if (sort[1]){
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc"
        }

        const users = await UserModel.find({name:{$regex:search,$options:"i"}})
        .where("category")
        .in([...category])
        .sort(sortBy)
        .skip(page*limit)
        .limit(limit)

        const total = await UserModel.countDocuments({
            category:{$in:[...category]},
            name:{$regex:search,$options:"i"}
        })
        
        const response={
            error:false,
            total,
            pages:page+1,
            limit,
            category:genreOptions,
            users
        }
        res.send(response)
    }catch (err) {
        console.log({ "err": err });
    }
})

UserRouter.patch("/edit/:id",async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    try{
        await UserModel.findByIdAndUpdate({_id:ID},payload)
        res.send("update")
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    } 
})


UserRouter.delete("/delete/:id",async(req,res)=>{
    const ID = req.params.id
    try{
        await UserModel.findByIdAndDelete({_id:ID})
        res.send("Delete")
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    } 
})

module.exports={
    UserRouter
}