const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        //required true means that this field cannot be empty
        required:true,

    },

    email:{
        type:String,
    required:true,
    unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    pic:{
        type:String,
        default:"https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"

    },

    followers:[
        {
            type:ObjectId,
            ref:"User"
        },
    ],


    following:[
        {
            type:ObjectId,
            ref:"User"
        },
    ],



})

const User=mongoose.model("User",userSchema)
module.exports=User