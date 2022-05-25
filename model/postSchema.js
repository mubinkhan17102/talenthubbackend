const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        required:true
    }
});

module.exports = postSchema;