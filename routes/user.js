const express=require('express')
const  requireLogin=require('../middleware/requireLogin')
const User=require('../models/user')
const Post=require("../models/post")

const router=express.Router()



router.get("/user/:id",requireLogin,(req,res)=>{
    User.findOne({id:req.params.id})
        .select("-password")
        .then(user=>{
            Post.find({postedBy:req.params.id})
            .populate("postedBy","_id name")
            .then(result=>{
                return res.status(200).json({user,result})
            })
        })
})

//error part
router.put("/follow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true

    })
    .then(result=>{
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}

        },{
            new:true
        })
        .then(myresult=>res.json(myresult))
    })
})

router.put("/unfollow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true

    })
    .then(result=>{
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.unfollowId}

        },{
            new:true
        })
        .then(myresult=>res.json(myresult))
    })
})

router.get("/subpost",requireLogin,(req,res)=>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("comments.postedBy","_id name")
    .then(posts=>res.json(posts))
})



module.exports=router