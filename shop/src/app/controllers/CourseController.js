const Course = require('../models/Course');
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

class CourseController {
    //[GET] /courses/admin/:id/show
    showAdmin(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        Course.findOne({ _id: req.params.id })
                            .then(course => {
                                res.render('courses/showAdmin', {
                                    adminInfo: mongooseToObject(adminInfo),
                                    course: mongooseToObject(course),
                                });
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

    //[GET] /courses/user/:id/show
    showUser(req,res,next){
        //req.params.slug cái slug lấy từ bên route qua nên bên route đặt tên j thì bên đây đặt theo z thay slug bằng id, abc j đó cũng đc mà bên route cũng phải thay giống z
        //res.send('COURSE DETAIL + ' + req.params.slug);
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(userInfo => {
                        Course.findOne({ _id: req.params.id })
                            .then(course => {
                                res.render('courses/showUser', {
                                    userInfo: mongooseToObject(userInfo),
                                    course: mongooseToObject(course),
                                });
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
        // Course.findOne({_id: req.params.id})
        //     .then(course => 
        //         res.render('courses/showUser', {course: mongooseToObject(course)})
        //     )
        //     .catch(next);
    }
}

module.exports = new CourseController;

