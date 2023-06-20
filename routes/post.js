const express = require('express')
const requireLogin = require("../middleware/requireLogin")
const Post = require('../models/post')
const router = express.Router()

router.post("/createPost", requireLogin, (req, res) => {
    const { title, body, pic } = req.body
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please Fill All The Fields" })

    } else {
        const post = new Post({
            title,
            body,
            photo: pic,
            postedBy: req.user
        })

        post.save()
            .then(result => res.json({ post: result }))
            .catch(err => console.log)
    }
})

router.get("/allpost", requireLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "name email")
        .then(posts => res.status(200).json(posts))
        .catch(err => console.log(err))
})

router.get("/mypost", requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .then(mypost => res.status(200).json({ posts: mypost }))
        .catch(err => console.log(err))
})

router.put("/like", requireLogin,(req, res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}

    },{
        new:true
    })
    .then (result=>res.json(result))
    .catch(err=>res.status(422).json({error:err}))
})

router.put("/dislike", requireLogin,(req, res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}

    },{
        new:true
    })
    .then (result=>res.json(result))
    .catch(err=>res.status(422).json({error:err}))
})


router.delete("/deletepost/:postId", requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .then(result=>{
        if(result.postedBy._id.toString()==req.user._id.toString()){
            result.deleteOne()
            return res.status(200).json({msg:"Post Deleted"})

        }else{
            return res.status(422).json("UNAUTHORIZED")
        }
    })
})


router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>res.status(400).json({error:err}))
})




module.exports = router