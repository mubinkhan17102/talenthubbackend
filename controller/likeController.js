const express = require('express');
const mongoose = require('mongoose');
const likeRouter = express.Router();
const likeSchema = require('../model/likeSchema');


const Like = new mongoose.model('Like', likeSchema);

//Endpoint for like count for a post

likeRouter.post('/', (req, res)=>{
    const id = req.body.id;
    Like.find({postid:id},(err, data)=>{
        if(err){
            res.json({msg:'Something went wrong'});
        }else{
            if(data.length){
                Like.updateOne(
                    {postid:id},
                    {
                        $set:{
                            totallike: Number.parseInt(req.body.like)+1,
                        }
                    },
                    err=>{
                        if(err){
                            res.json({msg:'Something wrong'});
                        }else{
                            res.json({msg:'Like counted'});
                        }
                    }
                )
            }
            else{
                let like = {
                    postid:req.body.id,
                    totallike:(req.body.like+1),
                }
                const newlike = new Like(like);
                newlike.save(err=>{
                    if(err){
                        res.json({msg:'Something went wrong'});
                    }else{
                        res.json({msg:'Like counted'});
                    }
                })
            }
        }
    });


    
})

//Endpoint for get total like for individual post

likeRouter.get('/:id', (req, res)=>{
    const id = req.params.id;
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