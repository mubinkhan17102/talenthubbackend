document.getElementById('getdata').addEventListener('click', ()=>{
    axios({
        mathod:'get',
        url:'http://localhost:5000/post'
    })
    .then((res)=>{
        const {_id, title, like} = res.data[0];
        console.log(_id, title, like);
    })
    .catch(err=>{
        console.log(err);
    });
})

document.getElementById('setdata').addEventListener('click', ()=>{
    axios.post('http://localhost:5000/post',{
        title:'this is the title ooo',
        video:'This ulr',
        like:1
    })
    .then(res=>{
        console.log(res.data);
    })
})