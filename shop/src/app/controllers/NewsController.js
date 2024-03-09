const Course = require('../models/Course');
const {mongooseToObject,mutipleMongooseToObject} = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class NewsController {
    //[GET] /news
    index(req,res){
        res.render('news');
    }

    //[GET] /news/:slug
    show(req,res){
        res.send('NEWS DETAIL!!!');
    }
}

module.exports = new NewsController;

