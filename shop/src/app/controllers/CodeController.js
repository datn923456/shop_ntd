const Course = require('../models/Course');
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ComboCode = require('../models/ComboCode');
const InfoCode = require('../models/InfoCode');
const Code1 = require('../models/Code1');
const Code2 = require('../models/Code2');
const Code3 = require('../models/Code3');
const Code4 = require('../models/Code4');
const CodeOrder = require('../models/CodeOrder');
const HistoryGiaoDich = require('../models/historyGiaoDich');
const doanhThu = require('../models/doanhThu');

//const { io } = require('../../index')
//const CodeOrderCombo = require('../models/CodeOrderCombo');

class CodeController {
    //[GET] /code/admin/:slug/show
    showCodeAdmin(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        Code1.findOne({slug: req.params.slug})
                            .then(infoCode1 => {
                                Code1.countDocuments({letterNumber: "1"})
                                    .then(codeCount1 => {
                                        Code2.findOne({slug: req.params.slug})
                                            .then(infoCode2 => {
                                                Code2.countDocuments({letterNumber: "2"})
                                                    .then(codeCount2 => {
                                                        Code3.findOne({slug: req.params.slug})
                                                            .then(infoCode3 => {
                                                                Code3.countDocuments({letterNumber: "3"})
                                                                    .then(codeCount3 => {
                                                                        Code4.findOne({slug: req.params.slug})
                                                                            .then(infoCode4 => {
                                                                                Code4.countDocuments({letterNumber: "4"})
                                                                                    .then(codeCount4 => {
                                                                                        InfoCode.findOne({slug: req.params.slug})
                                                                                            .then(profileCode =>{
                                                                                                res.render('code/showCodeAdmin', {
                                                                                                    adminInfo: mongooseToObject(adminInfo),
                                                                                                    infoCode1: mongooseToObject(infoCode1),
                                                                                                    infoCode2: mongooseToObject(infoCode2),
                                                                                                    infoCode3: mongooseToObject(infoCode3),
                                                                                                    infoCode4: mongooseToObject(infoCode4),
                                                                                                    profileCode: mongooseToObject(profileCode),
                                                                                                    codeCount1,codeCount2,codeCount3,codeCount4
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
        } else {
            res.redirect('/login');
        }
        // res.render('code/showCodeAdmin')
    }

    //[GET] /code/user/:slug/show
    showCodeUser(req,res,next){
        //req.params.slug cái slug lấy từ bên route qua nên bên route đặt tên j thì bên đây đặt theo z thay slug bằng id, abc j đó cũng đc mà bên route cũng phải thay giống z
        //res.send('COURSE DETAIL + ' + req.params.slug);
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        Code1.findOne({slug: req.params.slug})
                            .then(infoCode1 => {
                                Code1.countDocuments({letterNumber: "1"})
                                    .then(codeCount1 => {
                                        Code2.findOne({slug: req.params.slug})
                                            .then(infoCode2 => {
                                                Code2.countDocuments({letterNumber: "2"})
                                                    .then(codeCount2 => {
                                                        Code3.findOne({slug: req.params.slug})
                                                            .then(infoCode3 => {
                                                                Code3.countDocuments({letterNumber: "3"})
                                                                    .then(codeCount3 => {
                                                                        Code4.findOne({slug: req.params.slug})
                                                                            .then(infoCode4 => {
                                                                                Code4.countDocuments({letterNumber: "4"})
                                                                                    .then(codeCount4 => {
                                                                                        InfoCode.findOne({slug: req.params.slug})
                                                                                            .then(profileCode =>{ 
                                                                                                res.render('code/showCodeUser', {
                                                                                                    userInfo: mongooseToObject(userInfo),
                                                                                                    infoCode1: mongooseToObject(infoCode1),
                                                                                                    infoCode2: mongooseToObject(infoCode2),
                                                                                                    infoCode3: mongooseToObject(infoCode3),
                                                                                                    infoCode4: mongooseToObject(infoCode4),
                                                                                                    profileCode:mongooseToObject(profileCode),
                                                                                                    codeCount1,codeCount2,codeCount3,codeCount4
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
        } else {
            res.redirect('/login');
        }
    }

    //[POST] /code/admin/:slug/boughtcode
    showCodeBought(req,res,next){
        const soluong = req.body.quatity;
        const slug = req.params.slug; 
        
        //nhận được số lượng mua và slug của sản phẩm, tính tiền trước coi đủ không nếu đủ thì tìm sản phẩm có slug ở trên trong db, xong lấy ra theo số lượng của yêu cầu, và cập nhật lại số tiền cho user xong
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                // for(let i=1; i <= soluong ;i++){
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        Code4.find({slug: req.params.slug})
                            .then(codeInfoList4 => {
                                Code4.findOne({slug: req.params.slug})
                                    .then(codeInfo4 => {
                                        Code3.find({slug: req.params.slug})
                                            .then(codeInfoList3 => {
                                                Code3.findOne({slug: req.params.slug})
                                                    .then(codeInfo3 => {
                                                        Code2.find({slug: req.params.slug})
                                                            .then(codeInfoList2 => {
                                                                Code2.findOne({slug: req.params.slug})
                                                                    .then(codeInfo2 => {
                                                                        Code1.find({slug: req.params.slug})
                                                                            .then(codeInfoList1  => {
                                                                                Code1.findOne({slug: req.params.slug})
                                                                                    .then(codeInfo1  => {
                                                                                        if(codeInfoList2.length > 0){// code2 =====
                                                                                            const tongGia2 = soluong * codeInfo2.price;
                                                                                            const randomIds2 = getRandomIds2(codeInfoList2, soluong);
                                                                                            function getRandomIds2(codeInfoList2, quatity) {
                                                                                                    const randomIds2 = [];
                                                                                                    const totalProducts = codeInfoList2.length;
                                                                                                
                                                                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                                                                    if (totalProducts <= quatity) {
                                                                                                        return codeInfoList2.map(product => product._id);
                                                                                                    }
                                                                                                
                                                                                                    while (randomIds2.length < quatity) {
                                                                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                                                                        const randomProduct = codeInfoList2[randomIndex];
                                                                                                        if (!randomIds2.includes(randomProduct._id)) {
                                                                                                            randomIds2.push(randomProduct._id);
                                                                                                        }
                                                                                                    }
                                                                                                
                                                                                                    return randomIds2;
                                                                                                }
                                                                                                const promises2 = randomIds2.map((productId) => {
                                                                                                            let hasError = false;  // Biến flag
                                                                                                        
                                                                                                            return User.findOne({ _id: decodeToken._id })
                                                                                                                .then(user => {
                                                                                                                    if (user.coin < tongGia2) {
                                                                                                                        hasError = true;
                                                                                                                        return res.status(400).send('Số dư không đủ.');
                                                                                                                    } else {
                                                                                                                        return Code2.updateMany(
                                                                                                                            { slug: slug },
                                                                                                                            { $inc: { quatity: -1 } }
                                                                                                                        )
                                                                                                                        .then(() => {
                                                                                                                            return Code2.findOne({_id: productId})
                                                                                                                                .then(info2 => {
                                                                                                                                    console.log(' id code là: ' + productId)
                                                                                                                                    const orderItem = {
                                                                                                                                        userId: decodeToken._id,
                                                                                                                                        nameCode: info2.nameCode,
                                                                                                                                        code: info2.code,
                                                                                                                                        totalPrice: codeInfo2.price
                                                                                                                                    };
                                                                                                        
                                                                                                                                    return CodeOrder.insertMany(orderItem)
                                                                                                                                    .then(savedOrder => {
                                                                                                                                        return User.findOneAndUpdate(
                                                                                                                                            { _id: decodeToken._id },
                                                                                                                                            { $inc: { coin: -codeInfo2.price } },
                                                                                                                                            { new: true }
                                                                                                                                        )
                                                                                                                                        .then(updatedUser => {
                                                                                                                                            return Code2.findOneAndUpdate(
                                                                                                                                                { _id: productId, deleted: false },
                                                                                                                                                { $set: { deleted: true } }
                                                                                                                                            )
                                                                                                                                            .then(() => {
                                                                                                                                                console.log('Thông tin người dùng sau khi mua hàng là: ', updatedUser);
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
                                                                                                                    }
                                                                                                                })
                                                                                                                .catch(next);
                                                                                                            })
                                                                                                            .map(promise => promise.catch(() => null));// Bỏ qua Promise bị reject để tiếp tục xử lý
                                                                                                    
                                                                                                    Promise.all(promises2)
                                                                                                        .then(() => {
                                                                                                            console.log('Các ID đã được cập nhật thành công.');
                                                                                                            res.redirect('/home/admin');
                                                                                                        })
                                                                                                        .catch(next);    
                                                                                            
                                                                                        }
                                                                                        else if(codeInfoList1.length > 0){// code1==========
                                                                                            const tongGia1 = soluong * codeInfo1.price;
                                                                                            const randomIds1 = getRandomIds1(codeInfoList1, soluong);
                                                                                            function getRandomIds1(codeInfoList1, quatity) {
                                                                                                    const randomIds1 = [];
                                                                                                    const totalProducts = codeInfoList1.length;
                                                                                                
                                                                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                                                                    if (totalProducts <= quatity) {
                                                                                                        return codeInfoList1.map(product => product._id);
                                                                                                    }
                                                                                                
                                                                                                    while (randomIds1.length < quatity) {
                                                                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                                                                        const randomProduct = codeInfoList1[randomIndex];
                                                                                                        if (!randomIds1.includes(randomProduct._id)) {
                                                                                                            randomIds1.push(randomProduct._id);
                                                                                                        }
                                                                                                    }
                                                                                                
                                                                                                    return randomIds1;
                                                                                                }
                                                                                                const promises1 = randomIds1.map((productId) => {
                                                                                                        let hasError = false;  // Biến flag
                                                                                                    
                                                                                                        return User.findOne({ _id: decodeToken._id })
                                                                                                            .then(user => {
                                                                                                                if (user.coin < tongGia1) {
                                                                                                                    hasError = true;
                                                                                                                    return res.status(400).send('Số dư không đủ.');
                                                                                                                } else {
                                                                                                                    return Code1.updateMany(
                                                                                                                        { slug: slug },
                                                                                                                        { $inc: { quatity: -1 } }
                                                                                                                    )
                                                                                                                    .then(() => {
                                                                                                                        return Code1.findOne({_id: productId})
                                                                                                                            .then(info1 => {
                                                                                                                                console.log(' id code là: ' + productId)
                                                                                                                                const orderItem = {
                                                                                                                                    userId: decodeToken._id,
                                                                                                                                    nameCode: info1.nameCode,
                                                                                                                                    code: info1.code,
                                                                                                                                    totalPrice: codeInfo1.price
                                                                                                                                };
                                                                                                    
                                                                                                                                return CodeOrder.insertMany(orderItem)
                                                                                                                                .then(savedOrder => {
                                                                                                                                    return User.findOneAndUpdate(
                                                                                                                                        { _id: decodeToken._id },
                                                                                                                                        { $inc: { coin: -codeInfo1.price } },
                                                                                                                                        { new: true }
                                                                                                                                    )
                                                                                                                                    .then(updatedUser => {
                                                                                                                                        return Code1.findOneAndUpdate(
                                                                                                                                            { _id: productId, deleted: false },
                                                                                                                                            { $set: { deleted: true } }
                                                                                                                                        )
                                                                                                                                        .then(() => {
                                                                                                                                            console.log('Thông tin người dùng sau khi mua hàng là: ', updatedUser);
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
                                                                                                                }
                                                                                                            })
                                                                                                            .catch(next);
                                                                                                        })
                                                                                                        .map(promise => promise.catch(() => null));
                                                                                                    Promise.all(promises1)
                                                                                                        .then(() => {
                                                                                                            console.log('Các ID đã được cập nhật thành công.');
                                                                                                            res.redirect('/home/admin');
                                                                                                        })
                                                                                                        .catch(next);    
                                                                                        }else if(codeInfoList3.length > 0){ //code3========
                                                                                            const tongGia3 = soluong * codeInfo3.price;
                                                                                            const randomIds3 = getRandomIds3(codeInfoList3, soluong);
                                                                                            function getRandomIds3(codeInfoList3, quatity) {
                                                                                                    const randomIds3 = [];
                                                                                                    const totalProducts = codeInfoList3.length;
                                                                                                
                                                                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                                                                    if (totalProducts <= quatity) {
                                                                                                        return codeInfoList3.map(product => product._id);
                                                                                                    }
                                                                                                
                                                                                                    while (randomIds3.length < quatity) {
                                                                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                                                                        const randomProduct = codeInfoList3[randomIndex];
                                                                                                        if (!randomIds3.includes(randomProduct._id)) {
                                                                                                            randomIds3.push(randomProduct._id);
                                                                                                        }
                                                                                                    }
                                                                                                
                                                                                                    return randomIds3;
                                                                                                }
                                                                                                const promises3 = randomIds3.map((productId) => {
                                                                                                        let hasError = false;  // Biến flag
                                                                                                    
                                                                                                        return User.findOne({ _id: decodeToken._id })
                                                                                                            .then(user => {
                                                                                                                if (user.coin < tongGia3) {
                                                                                                                    hasError = true;
                                                                                                                    return res.status(400).send('Số dư không đủ.');
                                                                                                                } else {
                                                                                                                    return Code3.updateMany(
                                                                                                                        { slug: slug },
                                                                                                                        { $inc: { quatity: -1 } }
                                                                                                                    )
                                                                                                                    .then(() => {
                                                                                                                        return Code3.findOne({_id: productId})
                                                                                                                            .then(info3 => {
                                                                                                                                console.log(' id code là: ' + productId)
                                                                                                                                const orderItem = {
                                                                                                                                    userId: decodeToken._id,
                                                                                                                                    nameCode: info3.nameCode,
                                                                                                                                    code: info3.code,
                                                                                                                                    totalPrice: codeInfo3.price
                                                                                                                                };
                                                                                                    
                                                                                                                                return CodeOrder.insertMany(orderItem)
                                                                                                                                .then(savedOrder => {
                                                                                                                                    return User.findOneAndUpdate(
                                                                                                                                        { _id: decodeToken._id },
                                                                                                                                        { $inc: { coin: -codeInfo3.price } },
                                                                                                                                        { new: true }
                                                                                                                                    )
                                                                                                                                    .then(updatedUser => {
                                                                                                                                        return Code3.findOneAndUpdate(
                                                                                                                                            { _id: productId, deleted: false },
                                                                                                                                            { $set: { deleted: true } }
                                                                                                                                        )
                                                                                                                                        .then(() => {
                                                                                                                                            console.log('Thông tin người dùng sau khi mua hàng là: ', updatedUser);
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
                                                                                                                }
                                                                                                            })
                                                                                                            .catch(next);
                                                                                                        })
                                                                                                        .map(promise => promise.catch(() => null));
                                                                                                    Promise.all(promises3)
                                                                                                        .then(() => {
                                                                                                            console.log('Các ID đã được cập nhật thành công.');
                                                                                                            res.redirect('/home/admin');
                                                                                                        })
                                                                                                        .catch(next);  
                                                                                        }else if(codeInfoList4.length > 0){ //code4 ==============
                                                                                            const tongGia4 = soluong * codeInfo4.price;
                                                                                            const randomIds4 = getRandomIds4(codeInfoList4, soluong);
                                                                                            function getRandomIds4(codeInfoList4, quatity) {
                                                                                                    const randomIds4 = [];
                                                                                                    const totalProducts = codeInfoList4.length;
                                                                                                
                                                                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                                                                    if (totalProducts <= quatity) {
                                                                                                        return codeInfoList4.map(product => product._id);
                                                                                                    }
                                                                                                
                                                                                                    while (randomIds4.length < quatity) {
                                                                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                                                                        const randomProduct = codeInfoList4[randomIndex];
                                                                                                        if (!randomIds4.includes(randomProduct._id)) {
                                                                                                            randomIds4.push(randomProduct._id);
                                                                                                        }
                                                                                                    }
                                                                                                
                                                                                                    return randomIds4;
                                                                                                }
                                                                                                const promises4 = randomIds4.map((productId) => {
                                                                                                        let hasError = false;  // Biến flag
                                                                                                    
                                                                                                        return User.findOne({ _id: decodeToken._id })
                                                                                                            .then(user => {
                                                                                                                if (user.coin < tongGia4) {
                                                                                                                    hasError = true;
                                                                                                                    return res.status(400).send('Số dư không đủ.');
                                                                                                                } else {
                                                                                                                    return Code4.updateMany(
                                                                                                                        { slug: slug },
                                                                                                                        { $inc: { quatity: -1 } }
                                                                                                                    )
                                                                                                                    .then(() => {
                                                                                                                        return Code4.findOne({_id: productId})
                                                                                                                            .then(info4 => {
                                                                                                                                console.log(' id code là: ' + productId)
                                                                                                                                const orderItem = {
                                                                                                                                    userId: decodeToken._id,
                                                                                                                                    nameCode: info4.nameCode,
                                                                                                                                    code: info4.code,
                                                                                                                                    totalPrice: codeInfo4.price
                                                                                                                                };
                                                                                                    
                                                                                                                                return CodeOrder.insertMany(orderItem)
                                                                                                                                .then(savedOrder => {
                                                                                                                                    return User.findOneAndUpdate(
                                                                                                                                        { _id: decodeToken._id },
                                                                                                                                        { $inc: { coin: -codeInfo4.price } },
                                                                                                                                        { new: true }
                                                                                                                                    )
                                                                                                                                    .then(updatedUser => {
                                                                                                                                        return Code4.findOneAndUpdate(
                                                                                                                                            { _id: productId, deleted: false },
                                                                                                                                            { $set: { deleted: true } }
                                                                                                                                        )
                                                                                                                                        .then(() => {
                                                                                                                                            console.log('Thông tin người dùng sau khi mua hàng là: ', updatedUser);
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
                                                                                                                }
                                                                                                            })
                                                                                                            .catch(next);
                                                                                                        })
                                                                                                        .map(promise => promise.catch(() => null));
                                                                                                    Promise.all(promises4)
                                                                                                        .then(() => {
                                                                                                            console.log('Các ID đã được cập nhật thành công.');
                                                                                                            res.redirect('/home/admin');
                                                                                                        })
                                                                                                        .catch(next);  
                                                                                        }
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
        } else {
            res.redirect('/login');
        }
    }

    //[GET] /code/combo/admin/:slug/show
    showComboCodeAdmin(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        ComboCode.findOne({slug: req.params.slug})
                            .then(infoComboCode5 => {
                                ComboCode.countDocuments({letterNumber: "5"})
                                    .then(comboCodeCount5 => {
                                        InfoCode.findOne({slug: req.params.slug})
                                            .then(profileCode =>{ 
                                                res.render('code/showComboCodeAdmin', {
                                                    adminInfo: mongooseToObject(adminInfo),
                                                    infoComboCode5: mongooseToObject(infoComboCode5),
                                                    profileCode:mongooseToObject(profileCode),
                                                    comboCodeCount5,
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
        } else {
            res.redirect('/login');
        }
    }

    //[GET] /code/combo/user/:slug/show
    showComboCodeUser(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        ComboCode.findOne({slug: req.params.slug})
                            .then(infoComboCode5 => {
                                ComboCode.countDocuments({letterNumber: "5"})
                                    .then(comboCodeCount5 => {
                                        InfoCode.findOne({slug: req.params.slug})
                                            .then(profileCode => {
                                                res.render('code/showComboCodeUser', {
                                                    userInfo: mongooseToObject(userInfo),
                                                    profileCode:mongooseToObject(profileCode),
                                                    infoComboCode5: mongooseToObject(infoComboCode5),
                                                    comboCodeCount5,
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
        } else {
            res.redirect('/login');
        }
    }

    //[POST] /combo/admin/:slug/boughtcode
    showComboCodeBought(req,res,next){
        const soluong = req.body.quatity;
        const slug = req.params.slug;

        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                // for(let i=1; i <= soluong ;i++){
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        ComboCode.find({slug: req.params.slug})
                            .then(comboCodeInfoList => {
                                ComboCode.findOne({slug: req.params.slug})
                                    .then(comboCodeInfo => {
                                        const tongGia = soluong * comboCodeInfo.price;
                                        const randomIds = getRandomIds(comboCodeInfoList, soluong);
                                        function getRandomIds(comboCodeInfoList, quatity) {
                                                const randomIds = [];
                                                const totalProducts = comboCodeInfoList.length;
                                            
                                                // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                if (totalProducts <= quatity) {
                                                    return comboCodeInfoList.map(product => product._id);
                                                }
                                            
                                                while (randomIds.length < quatity) {
                                                    const randomIndex = Math.floor(Math.random() * totalProducts);
                                                    const randomProduct = comboCodeInfoList[randomIndex];
                                                    if (!randomIds.includes(randomProduct._id)) {
                                                        randomIds.push(randomProduct._id);
                                                    }
                                                }
                                            
                                                return randomIds;
                                            }
                                            const promises = randomIds.map((productId) => {
                                                    let hasError = false;  // Biến flag
                                                
                                                    return User.findOne({ _id: decodeToken._id })
                                                        .then(user => {
                                                            if (user.coin < tongGia) {
                                                                hasError = true;
                                                                return res.status(400).send('Số dư không đủ.');
                                                            } else {
                                                                return ComboCode.updateMany(
                                                                    { slug: slug },
                                                                    { $inc: { quatity: -1 } }
                                                                )
                                                                .then(() => {
                                                                    return ComboCode.findOne({_id: productId})
                                                                        .then(info => {
                                                                            console.log(' id code là: ' + productId)
                                                                            const orderItem = {
                                                                                //productId: productId,
                                                                                userId: decodeToken._id,
                                                                                nameCombo: info.nameCombo,
                                                                                nameCode1: info.nameCode1,
                                                                                code1: info.code1,
                                                                                nameCode2: info.nameCode2,
                                                                                code2: info.code2,
                                                                                nameCode3: info.nameCode3,
                                                                                code3: info.code3,
                                                                                nameCode4: info.nameCode4,
                                                                                code4: info.code4,
                                                                                totalPrice: comboCodeInfo.price
                                                                                //quatity: 1
                                                                            };
                                                                            //console.log(orderItem)
                                                                            return CodeOrder.insertMany(orderItem)
                                                                            .then(savedOrder => {
                                                                                return User.findOneAndUpdate(
                                                                                    { _id: decodeToken._id },
                                                                                    { $inc: { coin: -comboCodeInfo.price } },
                                                                                    { new: true }
                                                                                )
                                                                                .then(updatedUser => {
                                                                                    return ComboCode.findOneAndUpdate(
                                                                                        { _id: productId, deleted: false },
                                                                                        { $set: { deleted: true } }
                                                                                    )
                                                                                    .then(() => {
                                                                                        console.log('Thông tin người dùng sau khi mua hàng là: ', updatedUser);
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
                                                            }
                                                        })
                                                        .catch(next);
                                                    })
                                                    .map(promise => promise.catch(() => null));
                                                Promise.all(promises)
                                                    .then(() => {
                                                        console.log('Các ID đã được cập nhật thành công.');
                                                        res.redirect('/home/admin');
                                                    })
                                                    .catch(next);                         
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

    //[POST] /code/user/:slug/boughtcode
    showCodeBoughtUser(req,res,next){
        const soluong = req.body.quatity;
        const slug = req.params.slug; 
        
        console.log(soluong)
        console.log(slug)
        //nhận được số lượng mua và slug của sản phẩm, tính tiền trước coi đủ không nếu đủ thì tìm sản phẩm có slug ở trên trong db, xong lấy ra theo số lượng của yêu cầu, và cập nhật lại số tiền cho user xong
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                // for(let i=1; i <= soluong ;i++){
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        Code4.find({slug: req.params.slug})
                            .then(codeInfoList4 => {
                                Code4.findOne({slug: req.params.slug})
                                    .then(codeInfo4 => {
                                        Code3.find({slug: req.params.slug})
                                            .then(codeInfoList3 => {
                                                Code3.findOne({slug: req.params.slug})
                                                    .then(codeInfo3 => {
                                                        Code2.find({slug: req.params.slug})
                                                            .then(codeInfoList2 => {
                                                                Code2.findOne({slug: req.params.slug})
                                                                    .then(codeInfo2 => {
                                                                        Code1.find({slug: req.params.slug})
                                                                            .then(codeInfoList1  => {
                                                                                Code1.findOne({slug: req.params.slug})
                                                                                    .then(codeInfo1  => {
                                                                                        Code1.countDocuments({})
                                                                                            .then(tonKho1 =>{
                                                                                                Code2.countDocuments({})
                                                                                                    .then(tonKho2 =>{
                                                                                                        Code3.countDocuments({})
                                                                                                            .then(tonKho3 =>{
                                                                                                                Code4.countDocuments({})
                                                                                                                    .then(tonKho4 =>{
                                                                                                                        if(codeInfoList2.length > 0){// code2 =====
                                                                                                                            var quantity2 = 0;
                                                                                                                            var gia2 = 0;
                                                                                                                            const tongGia2 = soluong * codeInfo2.price;
                                                                                                                            const randomIds2 = getRandomIds2(codeInfoList2, soluong);
                                                                                                                            function getRandomIds2(codeInfoList2, quatity) {
                                                                                                                                    const randomIds2 = [];
                                                                                                                                    const totalProducts = codeInfoList2.length;
                                                                                                                                
                                                                                                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                                                                                                    if (totalProducts <= quatity) {
                                                                                                                                        return codeInfoList2.map(product => product._id);
                                                                                                                                    }
                                                                                                                                
                                                                                                                                    while (randomIds2.length < quatity) {
                                                                                                                                        
                                                                                                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                                                                                                        const randomProduct = codeInfoList2[randomIndex];
                                                                                                                                        if (!randomIds2.includes(randomProduct._id)) {
                                                                                                                                            randomIds2.push(randomProduct._id);
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                
                                                                                                                                    return randomIds2;
                                                                                                                                }
                                                                                                                                if(soluong > tonKho2){
                                                                                                                                    //hasError = true;
                                                                                                                                    return res.json({message: "Số lượng tồn kho không đủ"})
                                                                                                                                }else{
                                                                                                                                const promises2 = randomIds2.map((productId) => {
                                                                                                                                            let hasError = false;  // Biến flag
                                                                                                                                        
                                                                                                                                            return User.findOne({ _id: decodeToken._id })
                                                                                                                                                .then(user => {
                                                                                                                                                    if (user.coin < tongGia2) {
                                                                                                                                                        hasError = true;
                                                                                                                                                        return res.json({message: "Số dư không đủ hãy nạp thêm"})
                                                                                                                                                    } else {
                                                                                                                                                        return Code2.updateMany(
                                                                                                                                                            { slug: slug },
                                                                                                                                                            { $inc: { quatity: -1 } }
                                                                                                                                                        )
                                                                                                                                                        .then(() => {
                                                                                                                                                            return Code2.findOne({_id: productId})
                                                                                                                                                                .then(info2 => {
                                                                                                                                                                    console.log(' id code là: ' + productId)
                                                                                                                                                                    const orderItem = {
                                                                                                                                                                        userId: decodeToken._id,
                                                                                                                                                                        nameCode: info2.nameCode,
                                                                                                                                                                        code: info2.code,
                                                                                                                                                                        totalPrice: codeInfo2.price
                                                                                                                                                                    };
                                                                                                                                        
                                                                                                                                                                    return CodeOrder.insertMany(orderItem)
                                                                                                                                                                    .then(savedOrder => {
                                                                                                                                                                        return User.findOneAndUpdate(
                                                                                                                                                                            { _id: decodeToken._id },
                                                                                                                                                                            { $inc: { coin: -codeInfo2.price } },
                                                                                                                                                                            { new: true }
                                                                                                                                                                        )
                                                                                                                                                                        .then(updatedUser => {
                                                                                                                                                                            return Code2.findOneAndUpdate(
                                                                                                                                                                                { _id: productId, deleted: false },
                                                                                                                                                                                { $set: { deleted: true } }
                                                                                                                                                                            )
                                                                                                                                                                            .then(() => {
                                                                                                                                                                                const tienMoiLanMua = updatedUser.coin + codeInfo2.price;
                                                                                                                                                                            
                                                                                                                                                                                const lichSuGiaoDich = new HistoryGiaoDich({nameGiaoDich: "Mua code " + codeInfo2.nameCode,userId: decodeToken._id,username: adminInfo.username,value: codeInfo2.price, coin:tienMoiLanMua});
                                                                                                                                                                                lichSuGiaoDich.save()
                                                                                                                                                                                .then(() =>{
                                                                                                                                                                                    
                                                                                                                                                                                }).catch(next);
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
                                                                                                                                                    }
                                                                                                                                                })
                                                                                                                                                .catch(next);
                                                                                                                                            })
                                                                                                                                            .map(promise => promise.catch(() => null));// Bỏ qua Promise bị reject để tiếp tục xử lý
                                                                                                                                    
                                                                                                                                    Promise.all(promises2.map(promise => promise.then(() => {
                                                                                                                                        // Cập nhật quantity và gia ở đây
                                                                                                                                        quantity2 += 1;
                                                                                                                                        gia2 += codeInfo2.price;
                                                                                                                                    })))
                                                                                                                                    .then(() => {
                                                                                                                                            const doanhThuBan = new doanhThu({nameGiaoDich: "Mua Code",userId: decodeToken._id,username: adminInfo.username, quantity: quantity2, price: gia2, type:"Bán hàng",product:"Code " + codeInfo2.nameCode});
                                                                                                                                            doanhThuBan.save()
                                                                                                                                            .then(() =>{
                                                                                                                                                //console.log('Thông tin người dùng sau khi mua hàng là: ');
                                                                                                                                                return res.json({message: "Mua thành công"})
                                                                                                                                            }).catch(next);
                                                                                                                                            // res.status(200).json({ message: 'ok' });
                                                                                                                                            //res.redirect('/home?message=OK');
                                                                                                                                            
                                                                                                                                        })
                                                                                                                                        .catch(next);}   
                                                                                                                            
                                                                                                                        }
                                                                                                                        else if(codeInfoList1.length > 0){// code1==========
                                                                                                                            var quantity1 = 0;
                                                                                                                            var gia1 = 0;
                                                                                                                            const tongGia1 = soluong * codeInfo1.price;
                                                                                                                            const randomIds1 = getRandomIds1(codeInfoList1, soluong);
                                                                                                                            function getRandomIds1(codeInfoList1, quatity) {
                                                                                                                                    const randomIds1 = [];
                                                                                                                                    const totalProducts = codeInfoList1.length;
                                                                                                                                
                                                                                                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                                                                                                    if (totalProducts <= quatity) {
                                                                                                                                        return codeInfoList1.map(product => product._id);
                                                                                                                                    }
                                                                                                                                
                                                                                                                                    while (randomIds1.length < quatity) {
                                                                                                                                        
                                                                                                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                                                                                                        const randomProduct = codeInfoList1[randomIndex];
                                                                                                                                        if (!randomIds1.includes(randomProduct._id)) {
                                                                                                                                            randomIds1.push(randomProduct._id);
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                
                                                                                                                                    return randomIds1;
                                                                                                                                }
                                                                                                                                if(soluong > tonKho1){
                                                                                                                                    //hasError = true;
                                                                                                                                    return res.json({message: "Số lượng tồn kho không đủ"})
                                                                                                                                }else{
                                                                                                                                const promises1 = randomIds1.map((productId) => {
                                                                                                                                        let hasError = false;  // Biến flag
                                                                                                                                    
                                                                                                                                        return User.findOne({ _id: decodeToken._id })
                                                                                                                                            .then(user => {
                                                                                                                                                if (user.coin < tongGia1) {
                                                                                                                                                    hasError = true;
                                                                                                                                                    return res.json({message: "Số dư không đủ hãy nạp thêm"})
                                                                                                                                                } else {
                                                                                                                                                    return Code1.updateMany(
                                                                                                                                                        { slug: slug },
                                                                                                                                                        { $inc: { quatity: -1 } }
                                                                                                                                                    )
                                                                                                                                                    .then(() => {
                                                                                                                                                        return Code1.findOne({_id: productId})
                                                                                                                                                            .then(info1 => {
                                                                                                                                                                console.log(' id code là: ' + productId)
                                                                                                                                                                const orderItem = {
                                                                                                                                                                    userId: decodeToken._id,
                                                                                                                                                                    nameCode: info1.nameCode,
                                                                                                                                                                    code: info1.code,
                                                                                                                                                                    totalPrice: codeInfo1.price
                                                                                                                                                                };
                                                                                                                                    
                                                                                                                                                                return CodeOrder.insertMany(orderItem)
                                                                                                                                                                .then(savedOrder => {
                                                                                                                                                                    return User.findOneAndUpdate(
                                                                                                                                                                        { _id: decodeToken._id },
                                                                                                                                                                        { $inc: { coin: -codeInfo1.price } },
                                                                                                                                                                        { new: true }
                                                                                                                                                                    )
                                                                                                                                                                    .then(updatedUser => {
                                                                                                                                                                        return Code1.findOneAndUpdate(
                                                                                                                                                                            { _id: productId, deleted: false },
                                                                                                                                                                            { $set: { deleted: true } }
                                                                                                                                                                        )
                                                                                                                                                                        .then(() => {
                                                                                                                                                                            const tienMoiLanMua = updatedUser.coin + codeInfo1.price;
                                                                                                                                                                            
                                                                                                                                                                            const lichSuGiaoDich = new HistoryGiaoDich({nameGiaoDich: "Mua code " + codeInfo1.nameCode,userId: decodeToken._id,username: adminInfo.username,value: codeInfo1.price, coin:tienMoiLanMua});
                                                                                                                                                                            lichSuGiaoDich.save()
                                                                                                                                                                            .then(() =>{
                                                                                                                                                                                
                                                                                                                                                                            }).catch(next);
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
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                            .catch(next);
                                                                                                                                        })
                                                                                                                                        .map(promise => promise.catch(() => null));
                                                                                                                                    Promise.all(promises1.map(promise => promise.then(() => {
                                                                                                                                        // Cập nhật quantity và gia ở đây
                                                                                                                                        quantity1 += 1;
                                                                                                                                        gia1 += codeInfo1.price;
                                                                                                                                    })))
                                                                                                                                    .then(() => {
                                                                                                                                            const doanhThuBan = new doanhThu({nameGiaoDich: "Mua Code",userId: decodeToken._id,username: adminInfo.username, quantity: quantity1, price: gia1, type:"Bán hàng",product:"Code " + codeInfo1.nameCode});
                                                                                                                                            doanhThuBan.save()
                                                                                                                                            .then(() =>{
                                                                                                                                                //console.log('Thông tin người dùng sau khi mua hàng là: ');
                                                                                                                                                return res.json({message: "Mua thành công"})
                                                                                                                                            }).catch(next);
                                                                                                                                            // res.status(200).json({ message: 'ok' });
                                                                                                                                            //res.redirect('/home?message=OK');
                                                                                                                                            
                                                                                                                                        })
                                                                                                                                        .catch(next);} 
                                                                                                                        }else if(codeInfoList3.length > 0){ //code3========
                                                                                                                            var quantity3 =0;
                                                                                                                            var gia3 =0;
                                                                                                                            const tongGia3 = soluong * codeInfo3.price;
                                                                                                                            const randomIds3 = getRandomIds3(codeInfoList3, soluong);
                                                                                                                            function getRandomIds3(codeInfoList3, quatity) {
                                                                                                                                    const randomIds3 = [];
                                                                                                                                    const totalProducts = codeInfoList3.length;
                                                                                                                                
                                                                                                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                                                                                                    if (totalProducts <= quatity) {
                                                                                                                                        return codeInfoList3.map(product => product._id);
                                                                                                                                    }
                                                                                                                                
                                                                                                                                    while (randomIds3.length < quatity) {
                                                                                                                                        
                                                                                                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                                                                                                        const randomProduct = codeInfoList3[randomIndex];
                                                                                                                                        if (!randomIds3.includes(randomProduct._id)) {
                                                                                                                                            randomIds3.push(randomProduct._id);
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                
                                                                                                                                    return randomIds3;
                                                                                                                                }
                                                                                                                                if(soluong > tonKho3){
                                                                                                                                    //hasError = true;
                                                                                                                                    return res.json({message: "Số lượng tồn kho không đủ"})
                                                                                                                                }else{
                                                                                                                                const promises3 = randomIds3.map((productId) => {
                                                                                                                                        let hasError = false;  // Biến flag
                                                                                                                                    
                                                                                                                                        return User.findOne({ _id: decodeToken._id })
                                                                                                                                            .then(user => {
                                                                                                                                                if (user.coin < tongGia3) {
                                                                                                                                                    hasError = true;
                                                                                                                                                    return res.json({message: "Số dư không đủ hãy nạp thêm"})
                                                                                                                                                } else {
                                                                                                                                                    return Code3.updateMany(
                                                                                                                                                        { slug: slug },
                                                                                                                                                        { $inc: { quatity: -1 } }
                                                                                                                                                    )
                                                                                                                                                    .then(() => {
                                                                                                                                                        return Code3.findOne({_id: productId})
                                                                                                                                                            .then(info3 => {
                                                                                                                                                                console.log(' id code là: ' + productId)
                                                                                                                                                                const orderItem = {
                                                                                                                                                                    userId: decodeToken._id,
                                                                                                                                                                    nameCode: info3.nameCode,
                                                                                                                                                                    code: info3.code,
                                                                                                                                                                    totalPrice: codeInfo3.price
                                                                                                                                                                };
                                                                                                                                    
                                                                                                                                                                return CodeOrder.insertMany(orderItem)
                                                                                                                                                                .then(savedOrder => {
                                                                                                                                                                    return User.findOneAndUpdate(
                                                                                                                                                                        { _id: decodeToken._id },
                                                                                                                                                                        { $inc: { coin: -codeInfo3.price } },
                                                                                                                                                                        { new: true }
                                                                                                                                                                    )
                                                                                                                                                                    .then(updatedUser => {
                                                                                                                                                                        return Code3.findOneAndUpdate(
                                                                                                                                                                            { _id: productId, deleted: false },
                                                                                                                                                                            { $set: { deleted: true } }
                                                                                                                                                                        )
                                                                                                                                                                        .then(() => {
                                                                                                                                                                            const tienMoiLanMua = updatedUser.coin + codeInfo3.price;
                                                                                                                                                                            
                                                                                                                                                                            const lichSuGiaoDich = new HistoryGiaoDich({nameGiaoDich: "Mua code " + codeInfo3.nameCode,userId: decodeToken._id,username: adminInfo.username,value: codeInfo3.price, coin:tienMoiLanMua});
                                                                                                                                                                            lichSuGiaoDich.save()
                                                                                                                                                                            .then(() =>{
                                                                                                                                                                                
                                                                                                                                                                            }).catch(next);
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
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                            .catch(next);
                                                                                                                                        })
                                                                                                                                        .map(promise => promise.catch(() => null));
                                                                                                                                    Promise.all(promises3.map(promise => promise.then(() => {
                                                                                                                                        // Cập nhật quantity và gia ở đây
                                                                                                                                        quantity3 += 1;
                                                                                                                                        gia3 += codeInfo3.price;
                                                                                                                                    })))
                                                                                                                                    .then(() => {
                                                                                                                                            const doanhThuBan = new doanhThu({nameGiaoDich: "Mua Code",userId: decodeToken._id,username: adminInfo.username, quantity: quantity3, price: gia3, type:"Bán hàng",product:"Code " + codeInfo3.nameCode});
                                                                                                                                            doanhThuBan.save()
                                                                                                                                            .then(() =>{
                                                                                                                                                //console.log('Thông tin người dùng sau khi mua hàng là: ');
                                                                                                                                                return res.json({message: "Mua thành công"})
                                                                                                                                            }).catch(next);
                                                                                                                                            // res.status(200).json({ message: 'ok' });
                                                                                                                                            //res.redirect('/home?message=OK');
                                                                                                                                            
                                                                                                                                        })
                                                                                                                                        .catch(next);} 
                                                                                                                        }else if(codeInfoList4.length > 0){ //code4 ==============
                                                                                                                            var quantity4 = 0;
                                                                                                                            var gia4 = 0;
                                                                                                                            const tongGia4 = soluong * codeInfo4.price;
                                                                                                                            const randomIds4 = getRandomIds4(codeInfoList4, soluong);
                                                                                                                            function getRandomIds4(codeInfoList4, quatity) {
                                                                                                                                    const randomIds4 = [];
                                                                                                                                    const totalProducts = codeInfoList4.length;
                                                                                                                                
                                                                                                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quantity, lấy tất cả
                                                                                                                                    if (totalProducts <= quatity) {
                                                                                                                                        return codeInfoList4.map(product => product._id);
                                                                                                                                    }
                                                                                                                                
                                                                                                                                    while (randomIds4.length < quatity) {
                                                                                                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                                                                                                        const randomProduct = codeInfoList4[randomIndex];
                                                                                                                                        if (!randomIds4.includes(randomProduct._id)) {
                                                                                                                                            randomIds4.push(randomProduct._id);
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                
                                                                                                                                    return randomIds4;
                                                                                                                                }
                                                                                                                                if(soluong > tonKho4){
                                                                                                                                    //hasError = true;
                                                                                                                                    return res.json({message: "Số lượng tồn kho không đủ"})
                                                                                                                                }else{
                                                                                                                                const promises4 = randomIds4.map((productId) => {
                                                                                                                                        let hasError = false;  // Biến flag
                                                                                                                                    
                                                                                                                                        return User.findOne({ _id: decodeToken._id })
                                                                                                                                            .then(user => {
                                                                                                                                                if (user.coin < tongGia4) {
                                                                                                                                                    hasError = true;
                                                                                                                                                    return res.json({message: "Số dư không đủ hãy nạp thêm"})
                                                                                                                                                } else {
                                                                                                                                                    return Code4.updateMany(
                                                                                                                                                        { slug: slug },
                                                                                                                                                        { $inc: { quatity: -1 } }
                                                                                                                                                    )
                                                                                                                                                    .then(() => {
                                                                                                                                                        return Code4.findOne({_id: productId})
                                                                                                                                                            .then(info4 => {
                                                                                                                                                                console.log(' id code là: ' + productId)
                                                                                                                                                                const orderItem = {
                                                                                                                                                                    userId: decodeToken._id,
                                                                                                                                                                    nameCode: info4.nameCode,
                                                                                                                                                                    code: info4.code,
                                                                                                                                                                    totalPrice: codeInfo4.price
                                                                                                                                                                    // quatity: 1
                                                                                                                                                                };
                                                                                                                                    
                                                                                                                                                                return CodeOrder.insertMany(orderItem)
                                                                                                                                                                .then(savedOrder => {
                                                                                                                                                                    return User.findOneAndUpdate(
                                                                                                                                                                        { _id: decodeToken._id },
                                                                                                                                                                        { $inc: { coin: -codeInfo4.price } },
                                                                                                                                                                        { new: true }
                                                                                                                                                                    )
                                                                                                                                                                    .then(updatedUser => {
                                                                                                                                                                        return Code4.findOneAndUpdate(
                                                                                                                                                                            { _id: productId, deleted: false },
                                                                                                                                                                            { $set: { deleted: true } }
                                                                                                                                                                        )
                                                                                                                                                                        .then(() => {
                                                                                                                                                                            const tienMoiLanMua = updatedUser.coin + codeInfo4.price;
                                                                                                                                                                            
                                                                                                                                                                            const lichSuGiaoDich = new HistoryGiaoDich({nameGiaoDich: "Mua code " + codeInfo4.nameCode,userId: decodeToken._id,username: adminInfo.username,value: codeInfo4.price, coin:tienMoiLanMua});
                                                                                                                                                                            lichSuGiaoDich.save()
                                                                                                                                                                            .then(() =>{
                                                                                                                                                                                
                                                                                                                                                                            }).catch(next);
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
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                            .catch(next);
                                                                                                                                        })
                                                                                                                                        .map(promise => promise.catch(() => null));
                                                                                                                                    Promise.all(promises4.map(promise => promise.then(() => {
                                                                                                                                        // Cập nhật quantity và gia ở đây
                                                                                                                                        quantity4 += 1;
                                                                                                                                        gia4 += codeInfo4.price;
                                                                                                                                    })))
                                                                                                                                    .then(() => {
                                                                                                                                            const doanhThuBan = new doanhThu({nameGiaoDich: "Mua Code",userId: decodeToken._id,username: adminInfo.username, quantity: quantity4, price: gia4, type:"Bán hàng",product:"Code " + codeInfo4.nameCode});
                                                                                                                                            doanhThuBan.save()
                                                                                                                                            .then(() =>{
                                                                                                                                                //console.log('Thông tin người dùng sau khi mua hàng là: ');
                                                                                                                                                return res.json({message: "Mua thành công"})
                                                                                                                                            }).catch(next);
                                                                                                                                            // res.status(200).json({ message: 'ok' });
                                                                                                                                            //res.redirect('/home?message=OK');
                                                                                                                                            
                                                                                                                                        })
                                                                                                                                        .catch(next);} 
                                                                                                                        }

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
                                    })
                                    .catch(next);
                            })
                            .catch(next);
                    })
                    .catch(next);
            } catch (err) {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    }

    //[POST] /code/combo/user/:slug/boughtcode
    showComboCodeBoughtUser(req,res,next){
        const soluong = req.body.quatity;
        const slug = req.params.slug;
        //const io = req.app.locals.io;
        
        //console.log(soluong)
        //console.log(slug)
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                // for(let i=1; i <= soluong ;i++){
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        ComboCode.find({slug: req.params.slug})
                            .then(comboCodeInfoList => {
                                ComboCode.findOne({slug: req.params.slug})
                                    .then(comboCodeInfo => {
                                        ComboCode.countDocuments({})
                                            .then(tonKho =>{
                                                var quantity = 0;
                                                var gia = 0;
                                                const tongGia = soluong * comboCodeInfo.price;
                                                const randomIds = getRandomIds(comboCodeInfoList, soluong);
                                                function getRandomIds(comboCodeInfoList, quatity) {
                                                    const randomIds = [];
                                                    const totalProducts = comboCodeInfoList.length;
                                                
                                                    // Nếu số lượng sản phẩm ít hơn hoặc bằng quatity, lấy tất cả
                                                    if (totalProducts <= quatity) {
                                                        return comboCodeInfoList.map(product => product._id);
                                                    }
                                                
                                                    while (randomIds.length < quatity) {
                                                        const randomIndex = Math.floor(Math.random() * totalProducts);
                                                        const randomProduct = comboCodeInfoList[randomIndex];
                                                        if (!randomIds.includes(randomProduct._id)) {
                                                            randomIds.push(randomProduct._id);
                                                        }
                                                    }
                                                
                                                    return randomIds;
                                                }
                                                if(soluong > tonKho){
                                                    //hasError = true;
                                                    return res.json({message: "Số lượng tồn kho không đủ"})
                                                }else{
                                            const promises = randomIds.map((productId) => {
                                                    let hasError = false;  // Biến flag
                                                
                                                    return User.findOne({ _id: decodeToken._id })
                                                        .then(user => {
                                                            if (user.coin < tongGia) {
                                                                hasError = true;
                                                                return res.json({message: "Số dư không đủ hãy nạp thêm"})
                                                                //return res.redirect('/user/nomoney');
                                                            }else {
                                                                //console("-------------------")
                                                                return ComboCode.updateMany(
                                                                    { slug: slug },
                                                                    { $inc: { quatity: -1 } }
                                                                )
                                                                .then(() => {
                                                                    return ComboCode.findOne({_id: productId})
                                                                        .then(info => {
                                                                            console.log(' id code là: ' + productId)
                                                                            const orderItem = {
                                                                                //productId: productId,
                                                                                userId: decodeToken._id,
                                                                                nameCombo: info.nameCombo,
                                                                                nameCode1: info.nameCode1,
                                                                                code1: info.code1,
                                                                                nameCode2: info.nameCode2,
                                                                                code2: info.code2,
                                                                                nameCode3: info.nameCode3,
                                                                                code3: info.code3,
                                                                                nameCode4: info.nameCode4,
                                                                                code4: info.code4,
                                                                                totalPrice: comboCodeInfo.price
                                                                                //quatity: 1
                                                                            };
                                                                            //console.log(orderItem)
                                                                            return CodeOrder.insertMany(orderItem)
                                                                            .then(savedOrder => {
                                                                                return User.findOneAndUpdate(
                                                                                    { _id: decodeToken._id },
                                                                                    { $inc: { coin: -comboCodeInfo.price } },
                                                                                    { new: true }
                                                                                )
                                                                                .then(updatedUser => {
                                                                                    return ComboCode.findOneAndUpdate(
                                                                                        { _id: productId, deleted: false },
                                                                                        { $set: { deleted: true } }
                                                                                    )
                                                                                    .then(() => {
                                                                                        
                                                                                        const tienMoiLanMua = updatedUser.coin + comboCodeInfo.price;
                                                                                        
                                                                                        const lichSuGiaoDich = new HistoryGiaoDich({nameGiaoDich: "Mua Combo Code",userId: decodeToken._id,username: adminInfo.username,value: comboCodeInfo.price, coin:tienMoiLanMua});
                                                                                        lichSuGiaoDich.save()
                                                                                        .then(() =>{
                                                                                            // console.log('Thông tin người dùng sau khi mua hàng là: ', updatedUser);
                                                                                            // return res.json({message: "Mua thành công"})
                                                                                            //const doanhThuMoiLanMua = updatedUser.coin + comboCodeInfo.price;
                                                                                            
                                                                                            
                                                                                        }).catch(next);
                                                                                        //io.emit("Client-send-data","HELLO");
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
                                                            }
                                                        })
                                                        .catch(next);
                                                    })
                                                    .map(promise => promise.catch(() => null));
                                                Promise.all(promises.map(promise => promise.then(() => {
                                                    // Cập nhật quantity và gia ở đây
                                                    quantity += 1;
                                                    gia += comboCodeInfo.price;
                                                })))
                                                .then(() => {
                                                        const doanhThuBan = new doanhThu({nameGiaoDich: "Mua Combo Code",userId: decodeToken._id,username: adminInfo.username, quantity: quantity, price: gia, type:"Bán hàng",product:"Combo Code"});
                                                        doanhThuBan.save()
                                                        .then(() =>{
                                                            //console.log('Thông tin người dùng sau khi mua hàng là: ');
                                                            return res.json({message: "Mua thành công"})
                                                        }).catch(next);
                                                        // res.status(200).json({ message: 'ok' });
                                                        //res.redirect('/home?message=OK');
                                                        
                                                    })
                                                    .catch(next);}
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
}

module.exports = new CodeController;

