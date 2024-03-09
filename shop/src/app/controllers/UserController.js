const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Code1 = require('../models/Code1');
const Code2 = require('../models/Code2');
const Code3 = require('../models/Code3');
const Code4 = require('../models/Code4');
const ComboCode = require('../models/ComboCode');
const CodeOrder = require('../models/CodeOrder');
const HisNapThe = require('../models/historyNapThe');
const svgCaptcha = require('svg-captcha');
const moment = require('moment');
const PAGE_SIZE = 4 //số phần tử xuất hiện trong trang
const PAGE_SIZE_HISTORY = 5
const PAGE_SIZE_HISTORY_TRANSACTION = 10
const PAGE_SIZE_REROLL_HTNG = 20
// import gachthe
const { TELCO, COMMAND, chargingws } = require('../../gach_the/gach_the');
const historyNapThe = require('../models/historyNapThe');
const historyGiaoDich = require('../models/historyGiaoDich');
const accReRollHTNG = require('../models/accReRollHTNG');

class UserController {
    // //[GET] /news
    // index(req,res,next){
    //     Course.find({})
    //         .then(courses => {
    //             res.render('home', {
    //                 courses: mutipleMongooseToObject(courses)
    //             });
    //         })
    //         .catch(next);
    // }

    //[GET] /login
    login(req,res){
        res.render('user/login');
    }

    //[GET] /register
    register(req,res){
        res.render('user/register');
    }

    //[POST] /created
    created(req, res, next) {
        //console.log(req.params.createAt);
        //const formData = req.body;
        //formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8larDycSRqXaRytdeQKkFYM0ALA`;
        //const createUser = new User(formData);
        //console.log(createUser);
        // const oldPassword = req.body.oldPassword;
        // const newPassword = req.body.newPassword;
        // //const id = req.params.id
        // //const id = req.params.id;
        // var token = req.cookies.token;
        // if (token) { // Kiểm tra xem có token không
        //     try {
        //         User.findOne({_id: req.params.id})
        //         .then(user =>{ 
        //             if(user.password == oldPassword){
        //                 User.updateOne({_id: req.params.id}, {password: newPassword})
        //                 .then(()=> {
        //                     res.json({ message: 'Đổi mật khẩu thành công' });
        //                 })
        //                 .catch(next);
        //                 //res.json({ message: 'Dữ liệu đã được xử lý thành công.' });
        //             }
        //             else{
        //                 res.json({ message: 'Mật khẩu bạn vừa nhập không chính xác' });
        //             }
        //         })
        //         .catch(next);
        //     } catch (err) {
        //         //console.log(err)
        //         // Xử lý lỗi khi giải mã token không thành công
        //         res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        //     }
        // } else {
        //     // Xử lý trường hợp không có token
        //     //console.log(err)
        //     res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        // }

        //const currentDate = new Date();

        // Định dạng ngày giờ theo kiểu "06/03/2024 21:42"
        //const formattedDate = moment(currentDate).format('DD/MM/YYYY HH:mm');
        const { username, password, email } = req.body;

        const findUserByUsername = User.findOne({ username: username });
        const findUserByEmail = User.findOne({ email: email });

        Promise.all([findUserByUsername, findUserByEmail])
            .then(([userByUsername, userByEmail]) => {
                // Kiểm tra xem userByUsername và userByEmail có tồn tại không
                if (userByUsername) {
                    // Người dùng đã tồn tại với username đã nhập
                    console.log('Người dùng đã tồn tại với username:', userByUsername);
                    // Trả về thông báo hoặc xử lý tùy ý
                    res.json({ message: 'Username đã tồn tại' });
                }

                if (userByEmail) {
                    // Người dùng đã tồn tại với email đã nhập
                    console.log('Người dùng đã tồn tại với email:', userByEmail);
                    res.json({ message: 'Email đã được đăng ký' });
                    // Trả về thông báo hoặc xử lý tùy ý
                }

                // Nếu không có người dùng nào tồn tại với username hoặc email đã nhập
                if (!userByUsername && !userByEmail) {
                    console.log('Không có người dùng tồn tại với username hoặc email đã nhập.');
                    // Trả về thông báo hoặc xử lý tùy ý
                    const newUser = new User({ username, password, email, coin: 0,image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg", role: "user"});
                    newUser.save();
                    return res.json({ message: 'Đăng ký thành công' });
                }
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi tìm kiếm người dùng:', error);
            });

        
        //const { username, password, email } = req.body;
        // console.log(username)
        // // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
        // User.findOne({ username: username,email: email  })
        //     .then(existingUser,email => {
        //         if (existingUser) {
        //             console.log("đã có username")
        //             // Nếu username đã tồn tại, trả về thông báo lỗi
        //             //return res.json({message: 'error'});
        //             //socket.emit("datontai");
        //             //return res.send('Lỗi: Tên người dùng đã tồn tại.')
        //             res.json({ message: 'username đã tồn tại' });
        //         } else if(email){
        //             console.log("đã có email")
        //             res.json({ message: 'email đã được đăng ký' });
        //         }else {
        //             console.log("chưa có")
        //             // Nếu username không tồn tại, tạo user mới với email và lưu vào cơ sở dữ liệu
        //             const newUser = new User({ username, password, email, coin: 0,image: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" });
        //             newUser.save();
        //             return res.redirect('/login');
        //         }
        //     })
        //     .catch(error => {
        //         console.log("lỗi")
        //         //console.error(error);
        //         if (error.errors && error.errors.email) {
        //             // Nếu lỗi do trường email bị thiếu
        //             //return res.redirect('/register');
        //             return res.json({ message: '1' });
        //             //res.status(400).send('Lỗi: Email không được bỏ trống.');
        //         } else {
        //             // Xử lý các lỗi khác
        //             //return res.redirect('/register');
        //             return res.json({ message: '2' });
        //             //res.status(500).send('Lỗi: Không thể tạo người dùng. Vui lòng thử lại sau.');
        //         }
        //     });
    }
    
    //[POST] /logined
    logined(req, res,next){
        
        
        const { username, password } = req.body;

        // Tìm người dùng theo username
        const findUserByUsername = User.findOne({ username: username });

        // Tìm người dùng theo password
        const findUserByPassword = User.findOne({ password: password });

        // Sử dụng Promise.all để thực hiện cả hai truy vấn đồng thời
        Promise.all([findUserByUsername, findUserByPassword])
            .then(([userByUsername, userByPassword]) => {
                // Kiểm tra kết quả
                if (userByUsername && userByPassword) {
                    //console.log("1")
                    // Nếu cả username và password đều đúng
                    const token = jwt.sign({ _id: userByUsername._id }, 'mk');
                    req.session.token = token;
                    req.session.user = userByUsername;
                    return res.json({message: userByUsername.role, token: token});
                } else if (userByUsername && !userByPassword) {
                    //console.log("2")
                    // Nếu username đúng nhưng password sai
                    return res.json({ message: 'Sai mật khẩu' });
                } else {//console.log("3")
                    // Nếu username không có trong db
                    return res.json({ message: 'Tài khoản không tồn tại' });
                }
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error(error);
                return res.status(500).json({ message: 'Đã xảy ra lỗi' });
            });
        // Tìm user dựa trên username và password
        // User.findOne({ username, password })
        //     .then(user => {
        //     if (user) {
        //         // Nếu user tồn tại, tạo JWT
        //         const token = jwt.sign({ _id: user._id }, 'mk'); // Thay your_secret_key bằng một chuỗi bí mật thực tế

        //         // Lưu JWT vào session
        //         req.session.token = token;

        //         // Lưu thông tin user vào session (nếu bạn vẫn muốn sử dụng session)
        //         req.session.user = user;

        //         // Chuyển hướng về trang chính của ứng dụng
        //         //return res.render('home');
        //         //console.log(token + 'hi');
        //         return res.json({message: user.role, token: token});
        //         //return res.render('home');
        //         //console.log(token)
                
        //     } else {
        //         // Nếu không tìm thấy user, đăng nhập thất bại
        //         //res.redirect('back')
        //         res.status(401).json({ message: 'that bai' });
        //         //return res.json('that bai');
        //         //res.status(401).send('Sai tên đăng nhập hoặc mật khẩu');
        //     }
        //     })
        //     .catch(error => {
        //         //console.error(error);
        //         res.status(500).send('Lỗi: Không thể đăng nhập. Vui lòng thử lại sau.');
        //     });
    };

    //[GET] /infouser
    toolsUser(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(users => {
                        //console.log(users);
                        res.render('user/mainUser', {
                            users: mongooseToObject(users),
                        });
                    })
                    .catch(next);
            } catch (err) {
                //console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            //console.log(err)
            res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
    }
    
    //[GET] /user/info/:id/edit
    infoUser(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        //console.log(users);
                        res.render('user/infoUser', {
                            userInfo: mongooseToObject(userInfo),
                        });
                    })
                    .catch(next);
            } catch (err) {
                //console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            //console.log(err)
            res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
        //res.render('user/infoUser');
    }

    //[GET] /user/info/:id/add
    addInfoUser(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        //console.log(users);
                        res.render('user/infoUserAdd', {
                            userInfo: mongooseToObject(userInfo),
                        });
                    })
                    .catch(next);
            } catch (err) {
                //console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            //console.log(err)
            res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
    }

    //[PUT] /user/info/:id
    showInfoUserEdited(req,res,next){
        //{_id: req.params.id} lấy id để tìm mà mình đã có rồi, req.body là dữ liệu object muốn chỉnh sửa
        User.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/user/info'))
            .catch(next);
    }

    //[GET] /user/info/:id/edit
    editInfoUser(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        //console.log(users);
                        res.render('user/infoUserEdit', {
                            userInfo: mongooseToObject(userInfo),
                        });
                    })
                    .catch(next);
            } catch (err) {
                //console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            //console.log(err)
            res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
        //res.render('user/infoUserEdit');
    }

    //[PATCH] /user/info/:id
    showInfoUserAdd(req,res,next){
        User.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/user/info'))
            .catch(next);
    }

    //[GET] /user/codeorder
    showUserCodeOrder(req,res,next){
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(userInfo => {
                    CodeOrder.find({userId: userInfo._id})
                        .then(codeOrder => {
                            CodeOrder.find({ products: codeOrder.products })
                                .then(codeOrder2 => {
                                    User.countDocumentsWithDeleted({ deleted: true })
                                    .then(deletedCountUser => {
                                        let codeQuery = CodeOrder.find({ create: req.params.create });
    
                                        if (req.query.hasOwnProperty('_sort')) {
                                            codeQuery = codeQuery.sort({
                                                [req.query.column]: req.query.type
                                            });
                                        }
    
                                        Promise.all([codeQuery, deletedCountUser])
                                            .then(([adminUpdate, deletedCountUser]) => {
                                                res.render('user/codeUserOrder', {
                                                    userInfo: mongooseToObject(userInfo),
                                                    // course: mongooseToObject(course),
                                                    codeOrder:mutipleMongooseToObject(codeOrder),
                                                    codeOrder2:mutipleMongooseToObject(codeOrder2),
                                                    deletedCountUser,
                                                    adminUpdate: mutipleMongooseToObject(adminUpdate),
                                                });
                                            })
                                            .catch(next);
                                    })
                                    .catch(next);
                                })
                                .catch(next);
                        })
                        .catch(next);
                })
                .catch(next);
        } catch (err) {
            res.redirect('/login');
        }
        // res.render('user/codeUserOrder')
    }
    
    //[GET] /user/nomoney
    noMoneyUser(req,res,next){
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(userInfo => {
                    res.render('money/noMoneyUser', {
                        userInfo: mongooseToObject(userInfo), 
                    });    
                })
                .catch(next);
        } catch (err) {
            res.redirect('/login');
        }
        // res.render('money/noMoneyUser');
    }

    //[GET] /user/telecoms
    getTelecom(req, res){
        return res.json(TELCO);
    }

    //[GET] /user/new_captcha
    create_captcha(req, res){
        const captcha = svgCaptcha.create();
        // Lưu lại giá trị CAPTCHA để kiểm tra sau này
        req.session.captcha = captcha.text;
        res.type('svg');
        return res.send(captcha.data);
    }

    //[POST] /user/sendcard
    async postCard(req, res){
        const user = req.user;
        if(!user) return res.redirect('..');

        if(req.session.count_napthe) req.session.count_napthe++;
        else req.session.count_napthe = 1; // có thể xử lý nếu ko spam thì ko hiện captcha
        setTimeout(()=>{req.session.count_napthe--}, 1000*60); // sau 60 giây thì giảm

        if(req.session.count_napthe > 10){
            return res.json({message: "Vui lòng không spam"}); 
        }

        if(req.body.captcha && req.session.captcha?.toLowerCase() != req.body.captcha?.toLowerCase())
            return res.json({message: "CAPTCHA KHôNG đúng"}); 

        // HM
        const {telco, code, serial, amount} = req.body;
        const command = COMMAND.SEND_CARD;
        HisNapThe.countDocuments(async function(error, counter){
            if(error) return next(error);
            const request_id = counter+1;
            const his_napthe = new historyNapThe({
                userId: user._id,
                // status: request_id, 
                username: user.username,
                // message: "Thành công",
                request_id: request_id,
                // trans_id: request_id,
                telco:telco,
                // value:amount,
                // declared_value:amount,
                code:code,
                serial:serial,
                value:amount,
                command:command, 
                // callback_sign: "0"
            });
            his_napthe.save();
            
            
            //console.log(request_id);
            //res.json({userId: decodeToken._id,request_id: request_id,username: userInfo.username})
            // lưu {telco, code, serial, amount, request_id, command}
            // const his = new HisNapThe({userId: decodeToken._id,request_id: request_id,username: userInfo.username, user_name, JSON.stringify({telco, code, serial, amount, request_id, command})})
            // if(Object.keys(TELCO).includes(telco) && TELCO[telco].menhGia.includes(amount)){
            //     const res_gachthe = await chargingws(telco, code, serial, amount, request_id, command);
            //     return res.json(res_gachthe);
            // }
            
            return res.json(his_napthe);
        })
        
    }

    //[GET] /user/addfunds
    addFundsUser(req,res,next){
        var page = req.query.page;
        // console.log(JSON.stringify(req.user));
        if (req.user) {
            page = parseInt(page);
            if(page <1){
                page = 1
            }
            var soLuongBoQua = (page - 1) * PAGE_SIZE_HISTORY;
            HisNapThe.find({ username: req.user.username })
                .sort({ myCreatedAt: -1 })
                .skip(soLuongBoQua)
                .limit(PAGE_SIZE_HISTORY)
                .then(history => {
                    //console.log(history)
                    res.render('money/addFundsUser', {
                        userInfo: mongooseToObject(req.user),
                        history: mutipleMongooseToObject(history),
                        networks: Object.keys(TELCO),
                    });
                })
                .catch(next);
        } else {
            // If req.user is not defined, redirect to the login page
            res.redirect('/login');
        }
    }

    //[GET] /user/addfunds/bank
    addFundsUserBank(req,res,next){
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(userInfo => {
                    res.render('money/addFundsUserBank', {
                        userInfo: mongooseToObject(userInfo), 
                    });    
                })
                .catch(next);
        } catch (err) {
            res.redirect('/login');
        }
        //res.render('money/addFundsUser');
    }

    //[GET] /user/search
    showSearchUser(req,res,next){
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(userInfo => {
                    res.render('user/searchUser', {
                        userInfo: mongooseToObject(userInfo), 
                    });    
                })
                .catch(next);
        } catch (err) {
            res.redirect('/login');
        }
    }

    //[POST] /user/search
    searchUser(req,res,next){
        const search = req.body.Search;
        //const slug = req.params.slug;
        //const io = req.app.locals.io;
        console.log(search)
        if(search){
            var token = req.cookies.token;
            if (token) { // Kiểm tra xem có token không
                try {
                    // for(let i=1; i <= soluong ;i++){
                    var decodeToken = jwt.verify(token, 'mk');
                    User.findOne({ _id: decodeToken._id })
                        .then(userInfo => {
                            Code1.findOne({search: { $elemMatch: { $eq: search } }})
                                .then(searchCode1 =>{
                                    Code2.findOne({search: { $elemMatch: { $eq: search } }})
                                        .then(searchCode2 =>{
                                            console.log(searchCode2)
                                            ComboCode.findOne({nameCombo: search})
                                                .then(searchComboCode => {
                                                    res.render('user/searchUser', {
                                                        userInfo: mongooseToObject(userInfo),
                                                        searchCode1: mongooseToObject(searchCode1),
                                                        searchCode2: mongooseToObject(searchCode2),
                                                        searchComboCode: mongooseToObject(searchComboCode),
                                                    });
                                                })    
                                                .catch(next)
                                        })    
                                        .catch(next)
                                })
                                .catch(next)
                        })    
                        .catch(next)
                } catch (err) {
                    res.redirect('/login');
                }
            } else {
                res.redirect('/login');
            }
        }
        else{
            res.render('user/noSearchUser')
        }
    }

    //[POST] /user/codeorder/form-actions
    showUserCodeorderFormAction(req, res, next) {
        switch(req.body.action){
            case 'delete':
                CodeOrder.delete({_id: {$in: req.body.courseUserCodeorderIDS}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!'});
        }
    }

    //[DELETE] /user/codeorder/:id
    showUserCodeorderDeleted(req,res,next){
        //{_id: req.params.id} lấy id để tìm mà mình đã có rồi, req.body là dữ liệu object muốn chỉnh sửa
        CodeOrder.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[GET] /thong-tin-tai-khoan
    showThongTinTaiKhoan(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        console.log(userInfo);
                        res.render('user/addInfoUser', {
                            userInfo: mongooseToObject(userInfo),
                        });
                    })
                    .catch(next);
            } catch (err) {
                //console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            //console.log(err)
            res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
    }

    //[GET] /home/changepassword
    showChangePassword(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        //console.log(users);
                        res.render('user/changePassword', {
                            userInfo: mongooseToObject(userInfo),
                        });
                    })
                    .catch(next);
            } catch (err) {
                //console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            //console.log(err)
            res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
    }

    //[GET] /nap-the?page=1
    showNapThe(req,res,next){
        
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        //console.log(users);
                        res.render('user/addFundsUser', {
                            userInfo: mongooseToObject(userInfo),
                        });
                    })
                    .catch(next);
            } catch (err) {
                //console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            //console.log(err)
            res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
    }

    //[PATCH] /home/:id/changepassword
    showUserChangePassword(req,res,next){
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        //const id = req.params.id
        //const id = req.params.id;
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                User.findOne({_id: req.params.id})
                .then(user =>{ 
                    if(user.password == oldPassword){
                        User.updateOne({_id: req.params.id}, {password: newPassword})
                        .then(()=> {
                            res.json({ message: 'Đổi mật khẩu thành công' });
                        })
                        .catch(next);
                        //res.json({ message: 'Dữ liệu đã được xử lý thành công.' });
                    }
                    else{
                        res.json({ message: 'Mật khẩu bạn vừa nhập không chính xác' });
                    }
                })
                .catch(next);
            } catch (err) {
                //console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            //console.log(err)
            res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
        
        
    }

    
    //[GET] /code-order?page=
    showCodeOrder(req,res,next){
        
        var page = req.query.page;
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            page = parseInt(page);
            if(page <1){
                page = 1
            }
            var soLuongBoQua = (page - 1) * PAGE_SIZE;
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(userInfo => {
                    CodeOrder.find({userId: userInfo._id})
                        .sort({ myCreatedAt: -1 })
                        .skip(soLuongBoQua)
                        .limit(PAGE_SIZE)
                        .then(codeOrder => {
                            //codeOrder.sort((a, b) => new Date(b.myCreatedAt) - new Date(a.myCreatedAt));
                            User.countDocumentsWithDeleted({ deleted: true })
                                    .then(deletedCountUser => {
                                        let codeQuery = CodeOrder.find({ create: req.params.create });
    
                                        if (req.query.hasOwnProperty('_sort')) {
                                            codeQuery = codeQuery.sort({
                                                [req.query.column]: req.query.type
                                            });
                                        }
    
                                        Promise.all([codeQuery, deletedCountUser])
                                            .then(([adminUpdate, deletedCountUser]) => {
                                                res.render('user/codeOrder', {
                                                    userInfo: mongooseToObject(userInfo),
                                                    // course: mongooseToObject(course),
                                                    codeOrder:mutipleMongooseToObject(codeOrder),
                                                    deletedCountUser,
                                                    adminUpdate: mutipleMongooseToObject(adminUpdate),
                                                });
                                            })
                                            .catch(next);
                                    })
                                    .catch(next);
                        })
                        .catch(next);
                })
                .catch(next);
            
        } catch (err) {
            res.redirect('/login');
        }
    }

    //[GET] /Lichsugiaodich
    Lichsugiaodich(req,res,next){//PAGE_SIZE_HISTORY_TRANSACTION
        var page = req.query.page;
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            page = parseInt(page);
            if(page <1){
                page = 1
            }
            var soLuongBoQua = (page - 1) * PAGE_SIZE_HISTORY_TRANSACTION;
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(userInfo => {
                    historyGiaoDich.find({ username: userInfo.username })
                        .sort({ HistoryGiaoDichCreatedAt: -1 })
                        .skip(soLuongBoQua)
                        .limit(PAGE_SIZE_HISTORY_TRANSACTION)
                        .then(transactionHistory => {
                            res.render('user/transactionHistory', {
                                userInfo: mongooseToObject(userInfo), 
                                transactionHistory: mutipleMongooseToObject(transactionHistory),
                            });  
                        })
                        .catch(next);  
                })
                .catch(next);
        } catch (err) {
            res.redirect('/login');
        }
    }

    //[GET] /home/accreroll-htng
    accReRollHTNG(req,res,next){
        var page = req.query.page;
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            page = parseInt(page);
            if(page <1){
                page = 1
            }
            var soLuongBoQua = (page - 1) * PAGE_SIZE_REROLL_HTNG;
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(userInfo => {
                    accReRollHTNG.find({})
                        .skip(soLuongBoQua)
                        .limit(PAGE_SIZE_REROLL_HTNG)
                        .then(accReRollHTNG => {
                            res.render('user/accReRollHTNG', {
                                userInfo: mongooseToObject(userInfo), 
                                accReRollHTNG: mutipleMongooseToObject(accReRollHTNG),
                            });  
                        })
                        .catch(next);  
                })
                .catch(next);
        } catch (err) {
            res.redirect('/login');
        }
    }
}

module.exports = new UserController;

// file này ở đâu http://localhost:3000/user/addfunds