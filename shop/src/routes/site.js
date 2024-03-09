const express = require('express');
const router = express.Router();
const session = require('express-session');
//const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
// const socketIO = require('socket.io');

// const io = socketIO();
//onst checkSession = require('../index')

// const server = require('http').createServer(router);
// const io = socketIO(server)

const siteController = require('../app/controllers/SiteController');

const User = require('../app/models/User');

const onlineUsers = [];

// io.on('connection', (socket) => {
//     console.log('A user connected');
//     // Thêm user vào danh sách online khi kết nối
//     onlineUsers.push(socket.id);

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//         // Xóa user khỏi danh sách online khi ngắt kết nối
//         const index = onlineUsers.indexOf(socket.id);
//         if (index !== -1) {
//             onlineUsers.splice(index, 1);
//         }
//     });
// });
// router.io = io;
var checkLogin = (req,res,next)=>{
    try{
        var token = req.cookies.token;
        res.locals.token = token;
        var idUser = jwt.verify(token, 'mk');
        User.findOne({
            _id: idUser
        })
        .then(data =>{
            if(data){
                req.data = data;
                //req.socket = req.query.socketId;
                //console.log("Socket ID: " + req.io.sockets.adapter.rooms.get(idUser));
                //console.log("id: " + req.socket)
                next()
            }else{
                res.redirect('/login')
            }
        })
        .catch(err =>{

        })
        
    }catch (error){
        console.log(error)
        //res.status(500).json("loi ben server");
        return res.redirect('/login')
    }
    
}

var checkLogin2 = (req,res,next)=>{
    try{
        var token = req.cookies.token;
        res.locals.token = token;
        var idUser = jwt.verify(token, 'mk');
        User.findOne({
            _id: idUser
        })
        .then(data =>{
            if(data){
                req.data = data;
                //req.socket = req.query.socketId;
                //console.log("Socket ID: " + req.io.sockets.adapter.rooms.get(idUser));
                //console.log("id: " + req.socket)
                next()
            }else{
                res.redirect('/home')
            }
        })
        .catch(err =>{

        })
        
    }catch (error){
        console.log(error)
        //res.status(500).json("loi ben server");
        return res.redirect('/home')
    }
    
}

var checkUser = (req,res,next)=>{
    var role = req.data.role
    if(role === 'user' || role === 'admin'){
        next()
    }else{
        res.redirect('/login')
    }
}

var checkAdmin = (req,res,next)=>{
    var role = req.data.role
    if(role === 'admin'){
        next()
    }else{
        res.redirect('/login')
    }
}

var checkAdmin2 = (req,res,next)=>{
    var role = req.data.role
    if(role === 'admin'){
        next()
    }else{
        res.redirect('/home')
    }
}

// var setOnlineUsersCount = (req, res) => {
//     res.render('socket', { title: 'Socket.IO Page' });
//     // Gửi danh sách online users cho client
//     io.emit('onlineUsers', onlineUsers);
//     next();
// };

//Check session
// const checkSession = (req, res, next) => {
//     if (req.session && req.session.user) {
//       // Nếu có session và người dùng đã đăng nhập, cho phép tiếp tục
//       next();
//     } else {
//       // Nếu không, chuyển hướng người dùng đến trang đăng nhập
//       res.redirect('/login');
//     }
//   };

//router.get('/admin', siteController.adminManager);
router.get('/search',checkLogin,checkUser, siteController.search);
// router.get('/', checkSession ,(req,res)=>{
//     res.send('Welcome to the main page');
//     //siteController.index
// } );
//router.get('/', siteController.index);

router.get('/home/game',checkLogin,siteController.gameLoTo)
router.get('/home/admin',checkLogin,checkAdmin,siteController.indexHomeAdmin)
router.get('/home',checkLogin,siteController.indexHome)
router.get('/',checkLogin2,checkAdmin2,siteController.index)





//Ví dụ về middleware của user và admin phân quyền

// router.get('/user',checkLogin,checkUser,(req,res,next)=>{
//     res.json('ALL USER')
// })

// router.get('/manager',checkLogin,checkAdmin,(req,res,next)=>{
//     res.json('ADMIN MANAGER')
// })

module.exports = router;