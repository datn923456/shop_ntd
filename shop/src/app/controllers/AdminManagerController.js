const Course = require('../models/Course');
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');

class AdminManagerController {
    //[GET] /news/:slug
    // create(req,res,next){
    //     //req.params.slug cái slug lấy từ bên route qua nên bên route đặt tên j thì bên đây đặt theo z thay slug bằng id, abc j đó cũng đc mà bên route cũng phải thay giống z
    //     //res.send('COURSE DETAIL + ' + req.params.slug);
    //     res.send('ADMIN CREATE')
    // }

    //[GET] /admin
    // adminManager(req,res){
    //     res.render('admin/mainAdmin');
    // }

    //[GET] /admin/create
    // showAdminCreate(req,res,next){
    //     Course.findOne({create: req.params.create})
    //         .then(a => {
    //             res.render('admin/create')
    //         })
    //         .catch(next);
    // }

    // //[POST] /admin/store đã lưu dữ liệu mới
    // store(req, res, next) {
    //     const formData = req.body;
    //     formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8larDycSRqXaRytdeQKkFYM0ALA`;
    //     const create = new Course(formData);
        
    //     create.save()
    //         .then(() => {
    //             // Thêm thông báo cảnh báo vào đây
    //             res.redirect('/admin/create');
    //         })
    //         .catch(error => {
                
    //         });
    // }

    //[GET] /admin/update
    // showAdminUpdate(req,res,next){
    //     Course.find({create: req.params.create})
    //         .then(adminUpdate => 
                
    //             res.render('admin/update', {adminUpdate: mutipleMongooseToObject(adminUpdate)
    //         }))
    //         .catch(next);
    // }

    //[GET] /admin/update/:id/edit
    showDetailUpdate(req,res,next){
        Course.findById(req.params.id)
            .then(adminUpdateDetail => 
                
                res.render('admin/updateDetail', {adminUpdateDetail: mongooseToObject(adminUpdateDetail)
            }))
            .catch(next);
    }

    //[PUT] /admin/update/:id
    showDetailUpdateEdited(req,res,next){
        //{_id: req.params.id} lấy id để tìm mà mình đã có rồi, req.body là dữ liệu object muốn chỉnh sửa
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/update'))
            .catch(next);
    }

    //[DELETE] /admin/update/:id
    showUpdateDeleted(req,res,next){
        //{_id: req.params.id} lấy id để tìm mà mình đã có rồi, req.body là dữ liệu object muốn chỉnh sửa
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[GET] /admin/trashcan
    // showTrashCan(req, res, next) {
    //     Course.findWithDeleted({deleted: true})
    //         .then((adminFindDeleted) => {
    //             //console.log("Dữ liệu đã tìm thấy:", adminFindDeleted);
    //             res.render('admin/trashcan', {
    //                 adminFindDeleted: mutipleMongooseToObject(adminFindDeleted),
    //             });
    //         })
    //         .catch(next);
    // }

    //[PATCH] /admin/trashcan/:d/restore
    showUpdateTrashCan(req,res,next){
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /admin/trashcan/:id/delete
    showTrashCanDeleted(req,res,next){
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[GET] /admin/update
    showAdminUpdate(req, res, next) {
        Course.find({ create: req.params.create })
            .then(adminUpdate => {
                Course.countDocumentsWithDeleted({ deleted: true })
                    .then(deletedCount => {
                        res.render('admin/update', {
                            deletedCount,
                            adminUpdate: mutipleMongooseToObject(adminUpdate),
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }

    //[GET] /admin/create
    showAdminCreate(req,res,next){
        Course.findOne({create: req.params.create})
            .then(() => {
                Course.countDocumentsWithDeleted({ deleted: true })
                .then(deletedCount => {
                    res.render('admin/create', {
                        deletedCount,
                    });
                })
                .catch(next);
            })
            .catch(next);
    }

    //[POST] /admin/store đã lưu dữ liệu mới
    store(req, res, next) {
        //console.log(req.params.createAt);
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8larDycSRqXaRytdeQKkFYM0ALA`;
        const create = new Course(formData);
        
        create.save()
            .then(() => {
                // Thêm thông báo cảnh báo vào đây
                res.redirect('/admin/create');
            })
            .catch(error => {
                req.session.error = "Lỗi: Không thể lưu dữ liệu. Vui lòng thử lại sau.";
                res.redirect('back'); // Redirect lại trang hoặc back sau khi lưu thông báo lỗi vào session
            });
    }
    // 
    // store(req, res, next) {
    //     const formData = req.body;
    //     formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8larDycSRqXaRytdeQKkFYM0ALA`;
    //     const create = new Course(formData);
        
    //     create.save()
    //         .then(() => {
    //             // Thêm thông báo cảnh báo vào đây nếu cần
                
    //             res.redirect('/admin/create');
    //         })
    //         .catch(error => {
    //             // Xử lý lỗi ở đây nếu cần
    //             next(error);
    //         });
    // }

    //[GET] /admin
    adminManager(req,res,next){
        Course.countDocumentsWithDeleted({ deleted: true })
                .then(deletedCount => {
                    res.render('admin/mainAdmin', {
                        deletedCount
                    });
                })
                .catch(next);
    }

    //[GET] /admin/trashcan
    showTrashCan(req, res, next) {
        Course.findWithDeleted({deleted: true})
            .then((adminFindDeleted) => {
                Course.countDocumentsWithDeleted({ deleted: true })
                .then(deletedCount => {
                    res.render('admin/trashcan', {
                        deletedCount,
                        adminFindDeleted: mutipleMongooseToObject(adminFindDeleted),
                    });
                })
                .catch(next);
            })
            .catch(next);
    }

    //[POST] /admin/update/form-action
    showAdminUpdateFormAction(req, res, next) {
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIDS}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!'});
        }
    }

    //[POST] /admin/trashcan/form-action
    showAdminTrashCanFormAction(req, res, next){
        switch(req.body.action){
            case 'restore':
                Course.restore({_id: {$in: req.body.courseDeleteIDS}})     
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'deleteVV':
                Course.deleteMany({_id: {$in: req.body.courseDeleteIDS}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!'});
        }
    }
}

module.exports = new AdminManagerController;

