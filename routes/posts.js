const express = require('express');

const router = express.Router();
const Post = require('../models/Post');



// Get all posts
router.get("/", async  (req,res) =>{
    console.log(req.body);
    try {
        const posts = await Post.find();
        console.log('abcd')
        res.json(posts);
       

    } catch (err){
        res.json({ message : err});
    }
});

router.get("/abc",(req,res) =>{
    res.send("we are on abc  posts");

});



/// submit a post
router.post('/' ,async  (req , res) => {
    const post = new Post({
        title : req.body.title,
        content: req.body.content
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err){
        res.json({message : err});
    }

});


// Get Specific Post
router.get('/:postId' , async (req , res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);

    } catch(err) {
        res.json({message : err});
    }
});



// delete post

router.delete('/:postId' , async (req , res) => {
    try {
        const removedPost = await Post.remove({_id :req.params.postId});
        res.json(removedPost);

    } catch(err) {
        res.json({message : err});
    }
});



//update posts

router.patch('/:postId' , async (req , res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id :req.params.postId},
            { $set : {title: req.body.title}}
                );
        res.json(updatedPost);

    } catch(err) {
        res.json({message : err});
    }
});





module.exports = router; 