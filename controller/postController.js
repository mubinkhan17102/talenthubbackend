const express = require('express');
const mongoose = require('mongoose');
const postRouter = express.Router();
const postSchema = require('../model/postSchema');
const path = require('path');


const Post = new mongoose.model('Post', postSchema);

//Endpoint for uploading a post
postRouter.post('/', (req, res)=>{
    const file = req.files.file;
    const filename = file.name;
    const ext = path.extname(filename);
    const md5 = file.md5;
    const url = `./public/${md5}${ext}`
    const post = {title:req.body.name,video:`${md5}${ext}`,like:0};
    file.mv(url,err=>{
        if(err)res.json({msg:'Somthing wrong'});
        else{
            const newpost = new Post(post);
            newpost.save((err)=>{
                if(err){
                   res.json({msg:'Post not saved'})
               }else{
                   res.json({mag:"Post save successfully"})
               }
            });
        }
    })     
})

//Endpoint for fetching all posts

postRouter.get('/', (req, res)=>{
    const posts = Post.find({} ,(err, data)=>{
        if(err){
            res.json({msg:'Data no found'})
        }else{
            res.json(data);
        }
    });
})

module.exports = postRouter;