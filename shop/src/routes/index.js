const newsRouter = require('./news');
const siteRouter = require('./site');
const adminRouter = require('./admin');
const coursesRouter = require('./courses');
const userRouter = require('./user');
const jwt = require('jsonwebtoken');
const User = require('../app/models/User');
const codeRouter = require('./code');
// const socketIO = require('socket.io');

// const io = socketIO();

function route(app,io){
    const arrayUser =[];
    
    io.on("connection", function(socket) {
        console.log("Có người connected: " + socket.id);
        // socket.emit("socketId", socket.id);
        socket.on("disconnect", function(){
          console.log(socket.id + " ngat ket noi !!!")
        });
      
        socket.on("Client-send-data", function(data){
            console.log(socket.id + " vua gui: " + data);
            //console.log(socket.id + "vua gui: " + data);
            io.sockets.emit("Server-send-data", data);
            
        });

        socket.on("Send-user-tao-room",function(data){
            
                socket.join(data);
                socket.Phong = data;
                // arrayUser.push(
                //     new userPlay(data.username,data.coin)
                // );
                
                //console.log(data.username);
                //console.log(typeof socket.adapter.rooms)
                //var mang = [];
                
                socket.emit("Send-user-vao-room", data);
                //io.sockets.in(socket.Phong).emit("dsUser",arrayUser);
                //socket.emit("dsUser", mang);
                //console.log(data.room);
                //console.log(data.inRoom);
            
            
        })
        
        socket.on('doimatkhau', (datas) => {
            console.log(datas.id)
            console.log(datas.mkc)
            console.log(datas.mkm)
            try {
                User.findOne({ _id: datas.id })
                    .then(data => {
                        if (data) {
                                if(data.password == datas.mkc){
                                    console.log("giong");
                                    // User.updateOne({_id: data.id}, {password: datas.mkm})
                                    // .then(() =>{ res.redirect('/thong-tin-tai-khoan')
                                    //     socket.emit("thanh cong");
                                    //     //console.log('User authenticated:', data.username);
                                    // })
                                    // .catch(next);
                                }
                                else{
                                    console.log("khong giong")
                                    //socket.emit("khong giong");
                                }
                        } else {
                            console.log('Authentication failed');
                        }
                    })
                    .catch(err => console.error(err));
            } catch (error) {
                console.log('Invalid token:', error);
            }
        });

        

        

        socket.on("Send-user-chat", function(data){
            //console.log(socket.Phong)
            //console.log(data)
            //socket.emit("chat", data);
            io.sockets.in(socket.Phong).emit("chat", data);
        })
        
    });

    var checkLogin = (req,res,next)=>{
        try{
            var token = req.cookies.token;
            res.locals.token = token;
            var idUser = jwt.verify(token, 'mk')
            User.findOne({
                _id: idUser
            })
            .then(data =>{
                if(data){
                    req.data = data;
                    req.socketId = data.socketId;
                    console.log(req.socketId)
                    next()
                }else{
                    res.json('NOT PERMISSON');
                }
            })
            .catch(err =>{
    
            })
            
        }catch (error){
            //res.status(500).json("loi ben server");
            return res.redirect('/login')
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
            //res.json('NOT PERMISSION')
            return res.redirect('back')
        }
    }
    //app.use('/', adminRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/code',codeRouter);
    app.use('/admin',checkLogin,checkAdmin, adminRouter);
    app.use('/', siteRouter);
    app.use('/', userRouter); 
}

module.exports = route;