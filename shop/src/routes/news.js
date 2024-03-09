const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../app/models/User');
const newsController = require('../app/controllers/NewsController');

var checkLogin = (req,res,next)=>{
    try{
        var token = req.cookies.token;
        var idUser = jwt.verify(token, 'mk')
        User.findOne({
            _id: idUser
        })
        .then(data =>{
            if(data){
                req.data = data;
                next()
            }else{
                res.json('NOT PERMISSON');
            }
        })
        .catch(err =>{

        })
        
    }catch (error){
        res.status(500).json("loi ben server");
        // return res.redirect('/login')
    }
    
}

var checkUser = (req,res,next)=>{
    var role = req.data.role
    if(role === 'user' || role === 'admin'){
        next()
    }else{
        res.json('NOT PERMISSION')
    }
}

var checkAdmin = (req,res,next)=>{
    var role = req.data.role
    if(role === 'admin'){
        next()
    }else{
        res.json('NOT PERMISSION')
    }
}

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;