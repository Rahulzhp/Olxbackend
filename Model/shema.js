
const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
		"name": String,
		"description" : String,
		"category" : String,
		"image" :String,
		"location" : String,
		"postedAt" :String,
		"price" : Number
})

const UserModel=mongoose.model("olx",UserSchema);

module.exports={
    UserModel
}