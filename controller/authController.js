const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const userSchema = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const authCheck = require('../middlewire/authMiddlewire');

const User = new mongoose.model('User', userSchema);

authRouter.post('/register',async (req, res)=>{
    try{
        const data = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }
        let user = await User.find({username:data.username});
        if(user.length && user[0].username === data.username){
            return res.json({msg:"user exist"});
        }
        let  haspass = await bcrypt.hash(data.password,10);
        data.password = haspass;
        const newuser = new User(data)
        await newuser.save();
        res.json({msg:'Go to login page'});
    }
    catch{
        res.json({msg:'Something gone wrong'})
    }
});

authRouter.get('/',authCheck,(req,res)=>{
    console.log(req.id);
    console.log(req.name);
    res.json({msg:'logged in'});
})

authRouter.post('/login',async (req, res)=>{
    const {username, password} = req.body;
    let user = await User.find({username:username});
    let id = user[0].id;
    let name = user[0].name;
    let token = await jwt.sign({ id:id,name:name }, 'mubin');
    res.json({token:token});
})


module.exports = authRouter;