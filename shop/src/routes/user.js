const express = require('express');
const router = express.Router();
const User = require('../app/models/User')
const jwt = require('jsonwebtoken');

const server = require('http').createServer(router);
const io = require('socket.io')(server,{ cors:{origin:"*"}});

const { gach_the_callback } = require('../gach_the/gach_the');

const UserBuild = require('../app/controllers/userController');
const { userInfo } = require('os');
//const { Socket } = require('socket.io');
const onlineUsers = [];
io.on("connection", (socket) => { // đâu cần đâuu
    console.log("User connected:" + socket.id);

    // Thêm socketId vào danh sách người dùng đang online
    onlineUsers.push({ userId: socket.id, username: 'Tên người dùng' });

    // Gửi số lượng người dùng đang online đến hbs
    io.emit("onlineUsersCount", onlineUsers.length);
});

// Middleware đơn giản để kiểm tra đnă nhập
var checkLogin = (req,res,next)=>{
    var token = req.cookies?.token;
    if(!token) return res.redirect('/login'); // CHưa đăng nhập

    var idUser = jwt.verify(token, 'mk')
    User.findOne({ _id: idUser })
    .then(user =>{
        if(user){
            req.user = user;
            req.socketId = req.query.socketId;
            next();
        }else{
            return res.json('NOT PERMISSON');
        }
    })
    .catch(err =>{
        console.log(err.message);
        next();
    })
    
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
    // check như này là bị lỗ hổng
    var role = req.data.role
    if(role === 'admin'){
        next()
    }else{
        res.json('NOT PERMISSION')
    }
}
// Middleware đơn giản để kiểm tra session
const checkSession = (req, res, next) => {
    if (req.session && req.session.user) {
      // Nếu có session và người dùng đã đăng nhập, cho phép tiếp tục
      next();
    } else {
      // Nếu không, chuyển hướng người dùng đến trang đăng nhập
      res.redirect('/login');
    }
  };

// router.get('/login',(req,res)=>{
//     res.send('please login');
//     registerUser.login
// });

router.get('/infouser',UserBuild.toolsUser);
router.get('/user/info',UserBuild.infoUser);    
router.get('/user/info/:id/add', UserBuild.addInfoUser);
router.get('/user/info/:id/edit', UserBuild.editInfoUser);

router.get('/user/new_captcha',UserBuild.create_captcha);
router.get('/user/telecom',UserBuild.getTelecom);
router.post('/user/sendcard',checkLogin, UserBuild.postCard);
router.post('/gach_the_callback', gach_the_callback);

router.get('/user/nomoney',checkLogin,UserBuild.noMoneyUser);
router.get('/Lichsugiaodich',checkLogin,UserBuild.Lichsugiaodich);
router.get('/home/accreroll-htng',checkLogin,UserBuild.accReRollHTNG);
router.get('/home/accreroll-htng/:id',checkLogin,UserBuild.infoAccReRollHTNG);
router.post('/home/accreroll-htng/:id/buy',UserBuild.buyAccHTNG)

router.get('/user/addfunds',checkLogin,UserBuild.addFundsUser);
//router.get('/user/addfunds/bank',checkLogin,UserBuild.addFundsUserBank);

// router.patch('/nap-tien/:id/nap-tien-card',checkLogin, UserBuild.addFundsUserBank);

router.get('/acc-order',checkLogin,UserBuild.showAccOrder)
router.get('/thong-tin-tai-khoan',checkLogin,UserBuild.showThongTinTaiKhoan)
router.get('/nap-the',checkLogin,UserBuild.addFundsUser)
router.get('/code-order',checkLogin,UserBuild.showCodeOrder)
router.get('/home/:id/changepassword',checkLogin,UserBuild.showChangePassword)
router.patch('/home/:id/changepassword', UserBuild.showUserChangePassword);

router.post('/user/codeorder/form-actions',UserBuild.showUserCodeorderFormAction);
router.delete('/user/codeorder/:id',UserBuild.showUserCodeorderDeleted);

router.get('/user/search', UserBuild.showSearchUser);
router.post('/user/search', UserBuild.searchUser);

router.put('/user/info/:id', UserBuild.showInfoUserEdited);
router.patch('/user/info/:id', UserBuild.showInfoUserAdd);
router.get('/login', UserBuild.login);
router.post('/logined', UserBuild.logined);
router.get('/register',UserBuild.register);
router.post('/register',UserBuild.created);
router.get('/user/codeorder',UserBuild.showUserCodeOrder);
router.get('/logout', function(req, res) {
    // Xóa cookie
    res.clearCookie('token'); // Thay 'cookieName' bằng tên của cookie bạn muốn xóa
    // Gửi phản hồi về cho client
    res.redirect('/login')
});


module.exports = router;