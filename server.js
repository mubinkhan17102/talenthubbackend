const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter = require('./controller/postController');
const fileuploader = require('express-fileupload');
const path = require('path');


const app = express();

app.use(cors({
    origin:'*'
}))
app.use(fileuploader());
app.use(express.static('public'));

app.use(express.json());
mongoose.connect('mongodb://localhost/talenthub')
    .then(()=>{
        console.log('Connected')
    })
    .catch(err=>{
        console.log('Connection failed')
    })

app.use('/post', postRouter);
app.use('/like', require('./controller/likeController'));

app.post('/upload', (req, res)=>{
    console.log(req.body);
    const file = req.files.file;
    const filename = file.name;
    const ext = path.extname(filename);
    const md5 = file.md5;
    const url = `./public/${md5}${ext}`
    file.mv(url,err=>{
        res.json(err);
    })
    res.json({msg:'success'})
})

app.listen('5000', ()=>{
    console.log('Server start at 5000 port');
})

module.exports = fileuploader;