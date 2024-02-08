const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');

class AdminCreateController {
    //[GET] /news/:slug
    // create(req,res,next){
    //     //req.params.slug cái slug lấy từ bên route qua nên bên route đặt tên j thì bên đây đặt theo z thay slug bằng id, abc j đó cũng đc mà bên route cũng phải thay giống z
    //     //res.send('COURSE DETAIL + ' + req.params.slug);
    //     res.send('ADMIN CREATE')
    // }
    adminManager(req,res){
        res.render('admin/mainAdmin');
    }
    showAdmin(req,res,next){
        Course.findOne({create: req.params.create})
            .then(admincreate => {
                res.render('admin/create')
            })
            .catch(next);
    }
    store(req,res,next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8larDycSRqXaRytdeQKkFYM0ALA`;
        const create = new Course(formData);
        create.save()
            .then(() => res.redirect('/'))
            .catch(error =>{

            });
    }
    

}

module.exports = new AdminCreateController;

