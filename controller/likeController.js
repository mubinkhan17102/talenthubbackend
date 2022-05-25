const express = require('express');
const mongoose = require('mongoose');
const likeRouter = express.Router();
const likeSchema = require('../model/likeSchema');


const Like = new mongoose.model('Like', likeSchema);

likeRouter.post('/', (req, res)=>{
    let like = {
        postid:req.body.id,
        totallike:(req.body.like+1),
    }
    console.log(like);
    const newlike = new Like(like);
    newlike.save(err=>{
         if(err){
             res.json({msg:'Something went wrong'});
         }else{
           res.json({msg:'Like counted'});
         }
     })
})

likeRouter.get('/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id);
   const likes = Like.find({postid:id},(err, data)=>{
       if(err){
           res.json({totllike:0});
       }else{
        if(data.length){
            res.json({totallike:data[0].totallike});
        }
        else{
            res.json({totallike:0});
        }
       }
   });
})

module.exports = likeRouter;