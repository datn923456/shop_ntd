const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');

class CourseController {
    //[GET] /news/:slug
    show(req,res,next){
        //req.params.slug cái slug lấy từ bên route qua nên bên route đặt tên j thì bên đây đặt theo z thay slug bằng id, abc j đó cũng đc mà bên route cũng phải thay giống z
        //res.send('COURSE DETAIL + ' + req.params.slug);

        Course.findOne({slug: req.params.slug})
            .then(course => 
                res.render('courses/show', {course: mongooseToObject(course)})
            )
            .catch(next);
    }
}

module.exports = new CourseController;

