const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    postid:{
        type:String,
        required:true
    },
    totallike:{
        type:Number,
        required:true
    },
});

module.exports = likeSchema;