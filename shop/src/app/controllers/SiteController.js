const Course = require('../models/Course');
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ComboCode = require('../models/ComboCode');
const Code1 = require('../models/Code1');
const Code2 = require('../models/Code2');
const Code3 = require('../models/Code3');
const Code4 = require('../models/Code4');
const AccReRollHTNG = require('../models/accReRollHTNG');

class SiteController {
    //[GET] /
    index(req,res,next){
        Course.find({})
            .then(courses => {
                Code1.find({letterNumber: "1"})
                    .then(codeNumber1 => {
                        Code1.findOne({letterNumber: "1"})
                            .then(codeNameNumber1 => {
                                Code2.findOne({letterNumber: "2"})
                                    .then(codeNameNumber2 => {
                                        Code3.findOne({letterNumber: "3"})
                                            .then(codeNameNumber3 => {
                                                Code4.findOne({letterNumber: "4"})
                                                    .then(codeNameNumber4 => {
                                                        Code2.find({letterNumber: "2"})
                                                            .then(codeNumber2 => {
                                                                Code3.find({letterNumber: "3"})
                                                                    .then(codeNumber3 => {
                                                                        Code4.find({letterNumber: "4"})
                                                                            .then(codeNumber4 => {
                                                                                Code1.countDocuments({letterNumber: "1"})
                                                                                    .then(codeCount1 => {
                                                                                        Code2.countDocuments({letterNumber: "2"})
                                                                                            .then(codeCount2 => {
                                                                                                Code3.countDocuments({letterNumber: "3"})
                                                                                                    .then(codeCount3 => {
                                                                                                        Code4.countDocuments({letterNumber: "4"})
                                                                                                            .then(codeCount4 => {
                                                                                                                ComboCode.findOne({letterNumber: "5"})
                                                                                                                    .then(codeNameNumber5 => {
                                                                                                                        ComboCode.countDocuments({letterNumber: "5"})
                                                                                                                            .then(codeCount5 => {
                                                                                                                                res.render('home', {
                                                                                                                                    courses: mutipleMongooseToObject(courses),
                                                                                                                                    codeNumber1: mutipleMongooseToObject(codeNumber1),
                                                                                                                                    codeNameNumber1: mongooseToObject(codeNameNumber1),
                                                                                                                                    codeNameNumber2: mongooseToObject(codeNameNumber2),
                                                                                                                                    codeNameNumber3: mongooseToObject(codeNameNumber3),
                                                                                                                                    codeNameNumber4: mongooseToObject(codeNameNumber4),
                                                                                                                                    codeNameNumber5: mongooseToObject(codeNameNumber5),
                                                                                                                                    codeNumber2: mutipleMongooseToObject(codeNumber2),
                                                                                                                                    codeNumber3: mutipleMongooseToObject(codeNumber3),
                                                                                                                                    codeNumber4: mutipleMongooseToObject(codeNumber4),
                                                                                                                                    codeCount1,codeCount2,codeCount3,codeCount4,codeCount5,    
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

    //[GET] /search
    search(req,res){
        res.render('search');
    }

    //[GET] /:slug
    // showUser(req,res,next){
    //     Course.find({})
    //         .then(courses => {
    //             res.render('home', {
    //                 courses: mutipleMongooseToObject(courses)
    //             });
    //         })
    //         .catch(next);
    // }

    //[GET] /home 
    indexHome(req, res, next) {
        var token = req.cookies.token;
        var token2 = res.locals.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(users => {
                        //console.log(users);
                        Course.find({})
                            .then(courses => {
                                Code1.find({letterNumber: "1"})
                                    .then(codeNumber1 => {
                                        Code1.findOne({letterNumber: "1"})
                                            .then(codeNameNumber1 => {
                                                Code2.findOne({letterNumber: "2"})
                                                    .then(codeNameNumber2 => {
                                                        Code3.findOne({letterNumber: "3"})
                                                            .then(codeNameNumber3 => {
                                                                Code4.findOne({letterNumber: "4"})
                                                                    .then(codeNameNumber4 => {
                                                                        Code2.find({letterNumber: "2"})
                                                                            .then(codeNumber2 => {
                                                                                Code3.find({letterNumber: "3"})
                                                                                    .then(codeNumber3 => {
                                                                                        Code4.find({letterNumber: "4"})
                                                                                            .then(codeNumber4 => {
                                                                                                Code1.countDocuments({letterNumber: "1"})
                                                                                                    .then(codeCount1 => {
                                                                                                        Code2.countDocuments({letterNumber: "2"})
                                                                                                            .then(codeCount2 => {
                                                                                                                Code3.countDocuments({letterNumber: "3"})
                                                                                                                    .then(codeCount3 => {
                                                                                                                        Code4.countDocuments({letterNumber: "4"})
                                                                                                                            .then(codeCount4 => {
                                                                                                                                ComboCode.findOne({letterNumber: "5"})
                                                                                                                                    .then(codeNameNumber5 => {
                                                                                                                                        ComboCode.countDocuments({letterNumber: "5"})
                                                                                                                                            .then(codeCount5 => {
                                                                                                                                                ComboCode.countDocumentsWithDeleted({deleted: true})
                                                                                                                                                    .then(comboCountBought => {
                                                                                                                                                        Code1.countDocumentsWithDeleted({deleted: true})
                                                                                                                                                            .then(codeCountBought1 => {
                                                                                                                                                                Code2.countDocumentsWithDeleted({deleted: true})
                                                                                                                                                                    .then(codeCountBought2 => {
                                                                                                                                                                        Code3.countDocumentsWithDeleted({deleted: true})
                                                                                                                                                                            .then(codeCountBought3 => {
                                                                                                                                                                                Code4.countDocumentsWithDeleted({deleted: true})
                                                                                                                                                                                    .then(codeCountBought4 => {
                                                                                                                                                                                        AccReRollHTNG.countDocuments({})
                                                                                                                                                                                            .then(accCount =>{
                                                                                                                                                                                                AccReRollHTNG.countDocumentsWithDeleted({deleted: true})
                                                                                                                                                                                                    .then(accCountDeleted =>{
                                                                                                                                                                                                        console.log(codeCountBought1)
                                                                                                                                                                                                        res.render('user/homeLogined', {
                                                                                                                                                                                                            users: mongooseToObject(users),
                                                                                                                                                                                                            courses: mutipleMongooseToObject(courses),
                                                                                                                                                                                                            codeNumber1: mutipleMongooseToObject(codeNumber1),
                                                                                                                                                                                                            codeNameNumber1: mongooseToObject(codeNameNumber1),
                                                                                                                                                                                                            codeNameNumber2: mongooseToObject(codeNameNumber2),
                                                                                                                                                                                                            codeNameNumber3: mongooseToObject(codeNameNumber3),
                                                                                                                                                                                                            codeNameNumber4: mongooseToObject(codeNameNumber4),
                                                                                                                                                                                                            codeNameNumber5: mongooseToObject(codeNameNumber5),
                                                                                                                                                                                                            codeNumber2: mutipleMongooseToObject(codeNumber2),
                                                                                                                                                                                                            codeNumber3: mutipleMongooseToObject(codeNumber3),
                                                                                                                                                                                                            codeNumber4: mutipleMongooseToObject(codeNumber4),
                                                                                                                                                                                                            codeCount1,codeCount2,codeCount3,codeCount4,codeCount5,
                                                                                                                                                                                                            token2,codeCountBought1,codeCountBought2,codeCountBought3,codeCountBought4,
                                                                                                                                                                                                            comboCountBought,accCount,accCountDeleted,
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
                console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                //res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            console.log(err)
            //res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
    }

    //[GET] /home/admin
    indexHomeAdmin(req,res,next){
        var token = req.cookies.token;
        var token2 = res.locals.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(admin => {
                        //console.log(users);
                        Course.find({})
                            .then(courses => {
                                Code1.find({letterNumber: "1"})
                                    .then(codeNumber1 => {
                                        Code1.findOne({letterNumber: "1"})
                                            .then(codeNameNumber1 => {
                                                Code2.findOne({letterNumber: "2"})
                                                    .then(codeNameNumber2 => {
                                                        Code3.findOne({letterNumber: "3"})
                                                            .then(codeNameNumber3 => {
                                                                Code4.findOne({letterNumber: "4"})
                                                                    .then(codeNameNumber4 => {
                                                                        Code2.find({letterNumber: "2"})
                                                                            .then(codeNumber2 => {
                                                                                Code3.find({letterNumber: "3"})
                                                                                    .then(codeNumber3 => {
                                                                                        Code4.find({letterNumber: "4"})
                                                                                            .then(codeNumber4 => {
                                                                                                Code1.countDocuments({letterNumber: "1"})
                                                                                                    .then(codeCount1 => {
                                                                                                        Code2.countDocuments({letterNumber: "2"})
                                                                                                            .then(codeCount2 => {
                                                                                                                Code3.countDocuments({letterNumber: "3"})
                                                                                                                    .then(codeCount3 => {
                                                                                                                        Code4.countDocuments({letterNumber: "4"})
                                                                                                                            .then(codeCount4 => {
                                                                                                                                ComboCode.findOne({letterNumber: "5"})
                                                                                                                                    .then(codeNameNumber5 => {
                                                                                                                                        ComboCode.countDocuments({letterNumber: "5"})
                                                                                                                                            .then(codeCount5 => {
                                                                                                                                                res.render('admin/homeAdminLogined', {
                                                                                                                                                    admin: mongooseToObject(admin),
                                                                                                                                                    courses: mutipleMongooseToObject(courses),
                                                                                                                                                    codeNumber1: mutipleMongooseToObject(codeNumber1),
                                                                                                                                                    codeNameNumber1: mongooseToObject(codeNameNumber1),
                                                                                                                                                    codeNameNumber2: mongooseToObject(codeNameNumber2),
                                                                                                                                                    codeNameNumber3: mongooseToObject(codeNameNumber3),
                                                                                                                                                    codeNameNumber4: mongooseToObject(codeNameNumber4),
                                                                                                                                                    codeNameNumber5: mongooseToObject(codeNameNumber5),
                                                                                                                                                    codeNumber2: mutipleMongooseToObject(codeNumber2),
                                                                                                                                                    codeNumber3: mutipleMongooseToObject(codeNumber3),
                                                                                                                                                    codeNumber4: mutipleMongooseToObject(codeNumber4),
                                                                                                                                                    codeCount1,codeCount2,codeCount3,codeCount4,codeCount5,
                                                                                                                                                    token2,
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

    //[GET] /home/game
    gameLoTo(req,res,next){
        var token3 = res.locals.token;
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(users => {
                        //console.log(users);
                        res.render('game/loTo', {
                            users: mongooseToObject(users),
                            token3,
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
        // res.render('game/loTo', {token3})
    }

    //[GET] /dich-vu
    showDichVu(req,res,next){
        var token = req.cookies.token;
        var token2 = res.locals.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(users => {
                        AccReRollHTNG.countDocuments({})
                            .then(accCount =>{
                                AccReRollHTNG.countDocumentsWithDeleted({deleted: true})
                                    .then(accCountDeleted =>{
                                        //console.log(codeCountBought1)
                                        res.render('user/homeDichVu', {
                                            users: mongooseToObject(users),
                                            accCount,accCountDeleted,
                                        });
                                    })
                                    .catch(next);
                            })
                            .catch(next);
                    })
                    .catch(next);
            } catch (err) {
                console.log(err)
                // Xử lý lỗi khi giải mã token không thành công
                //res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
            }
        } else {
            // Xử lý trường hợp không có token
            console.log(err)
            //res.redirect('/login'); // Hoặc thực hiện hành động phù hợp với trường hợp này
        }
    }
}

module.exports = new SiteController;

