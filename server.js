const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./controller/postController');
const fileuploader = require('express-fileupload');
const path = require('path');


const app = express();

//Allow all cross origin
app.use(cors({
    origin:'*'
}))

//Middleware for file uploader
app.use(fileuploader());
app.use(express.static('public'));
app.use(express.json());

//Connetion point of mongo db
mongoose.connect('mongodb://localhost/talenthub')
    .then(()=>{
        console.log('Connected')
    })
    .catch(err=>{
        console.log('Connection failed')
    })

//Route middleware for all post endpoint
app.use('/post', postRouter);
//Route middleware for all like endpoint
app.use('/like', require('./controller/likeController'));

app.listen('5000', ()=>{
    console.log('Server start at 5000 port');
})

module.exports = fileuploader;