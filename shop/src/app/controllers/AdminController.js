const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class AdminController {
    //[GET] /news
    index(req,res,next){
        Course.find({})
            .then(courses => {
                res.render('admin', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }

    //[GET] /news/:slug
    adminManager(req,res){
        res.render('mainAdmin');
    }
    
}

module.exports = new AdminController;