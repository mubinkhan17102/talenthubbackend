const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next)=>{
    try{
    const {authorization} = req.headers;
    const token = authorization.split(' ')[1];
    var decoded = jwt.verify(token, 'mubin');
    const {id, name} = decoded;
    req.id = id;
    req.name = name;
    next();
    }
    catch{
        res.json({msg:'Error'});
    }
}

module.exports = checkAuth;