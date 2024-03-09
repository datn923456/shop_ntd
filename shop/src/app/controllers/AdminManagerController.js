const Course = require('../models/Course');
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ComboCode = require('../models/ComboCode');
const InfoCode = require('../models/InfoCode');
const Code1 = require('../models/Code1');
const Code2 = require('../models/Code2');
const Code3 = require('../models/Code3');
const Code4 = require('../models/Code4');

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
            .then(adminUpdateDetail => {
                Course.countDocumentsWithDeleted({ deleted: true })
                    .then(deletedCount => {
                        User.countDocumentsWithDeleted({ deleted: true })
                        .then(deletedCountUser => {
                            res.render('admin/updateDetail', {
                                adminUpdateDetail: mongooseToObject(adminUpdateDetail),
                                deletedCount,deletedCountUser,
                            });
                        })
                        .catch(next);
                    })
                    .catch(next);
            })
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
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(adminInfo => {
                    Course.findOne({ create: req.params.create })
                        .then(course => {
                            Course.countDocumentsWithDeleted({ deleted: true })
                                .then(deletedCount => {
                                    User.countDocumentsWithDeleted({ deleted: true })
                                    .then(deletedCountUser => {
                                        let courseQuery = Course.find({ create: req.params.create });
    
                                        if (req.query.hasOwnProperty('_sort')) {
                                            courseQuery = courseQuery.sort({
                                                [req.query.column]: req.query.type
                                            });
                                        }
    
                                        Promise.all([courseQuery, deletedCount,deletedCountUser])
                                            .then(([adminUpdate, deletedCount,deletedCountUser]) => {
                                                res.render('admin/update', {
                                                    adminInfo: mongooseToObject(adminInfo),
                                                    course: mongooseToObject(course),
                                                    deletedCount,deletedCountUser,
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
    }

    //[GET] /admin/create
    showAdminCreate(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        //console.log(users);
                        Course.findOne({ create: req.params.create })
                            .then(course => {
                                Course.countDocumentsWithDeleted({ deleted: true })
                                    .then(deletedCount => {
                                        User.countDocumentsWithDeleted({ deleted: true })
                                        .then(deletedCountUser => {
                                            res.render('admin/create', {
                                                adminInfo: mongooseToObject(adminInfo),
                                                course: mongooseToObject(course),
                                                deletedCount,deletedCountUser,
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

    //[POST] /admin/store đã lưu dữ liệu mới
    store(req, res, next) {
        //console.log(req.params.createAt);
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8larDycSRqXaRytdeQKkFYM0ALA`;
        const create = new Course(formData);
        console.log(create);
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
    adminManager(req, res, next) {
        try {
            const token = req.cookies.token; // Lấy token từ yêu cầu
            if (!token) {
                throw new Error('No token provided');
            }
    
            const decodeToken = jwt.verify(token, 'mk');
            
            User.findOne({ _id: decodeToken._id })
                .then(admin => {
                    if (!admin) {
                        throw new Error('User not found');
                    }
    
                    // Truy vấn để đếm số lượng tài liệu đã xóa
                    Course.countDocumentsWithDeleted({ deleted: true })
                        .then(deletedCount => {
                            User.countDocumentsWithDeleted({ deleted: true })
                                .then(deletedCountUser => {
                                    res.render('admin/mainAdmin', {
                                        admin: mongooseToObject(admin), // Đảm bảo là một user, không phải users
                                        deletedCount,deletedCountUser,
                                    });
                                })
                                .catch(next);
                        })
                        .catch(next);
                })
                .catch(next);
        } catch (err) {
            // Xử lý lỗi khi giải mã token không thành công
            console.error('Error decoding token:', err);
            res.redirect('/login'); // Chuyển hướng người dùng đến trang đăng nhập hoặc thực hiện hành động phù hợp khác
        }
    }

    //[GET] /admin/trashcan
    showTrashCan(req, res, next) {
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(adminInfo => {
                    let courseQuery = Course.findWithDeleted({ deleted: true });

                    if (req.query.hasOwnProperty('_sort')) {
                        courseQuery = courseQuery.sort({
                            [req.query.column]: req.query.type
                        });
                    }

                    Promise.all([courseQuery, Course.countDocumentsWithDeleted({ deleted: true }),User.countDocumentsWithDeleted({ deleted: true })])
                        .then(([adminFindDeleted, deletedCount,deletedCountUser]) => {
                            res.render('admin/trashcan', {
                                adminInfo: mongooseToObject(adminInfo),
                                deletedCount,deletedCountUser,
                                adminFindDeleted: mutipleMongooseToObject(adminFindDeleted),
                            });
                        })
                        .catch(next);
                })
                .catch(next);
        } catch (err) {
            res.redirect('/login');
        }
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

    //[GET] /admin/users
    showAdminUsers(req,res,next){
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(adminInfo => {
                    User.findOne({ create: req.params.create })
                        .then(users => {
                            Course.countDocumentsWithDeleted({ deleted: true })
                                .then(deletedCount => {
                                    User.countDocumentsWithDeleted({ deleted: true })
                                        .then(deletedCountUser => {
                                            let UserQuery = User.find({ create: req.params.create });

                                            if (req.query.hasOwnProperty('_sort')) {
                                                UserQuery = UserQuery.sort({
                                                    [req.query.column]: req.query.type
                                                });
                                            }

                                            Promise.all([UserQuery, deletedCount,deletedCountUser])
                                                .then(([adminUsers, deletedCount,deletedCountUser]) => {
                                                    res.render('admin/usersManager', {
                                                        adminInfo: mongooseToObject(adminInfo),
                                                        users: mongooseToObject(users),
                                                        deletedCount,deletedCountUser,
                                                        adminUsers: mutipleMongooseToObject(adminUsers),
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
    }

    //[POST] /admin/users/form-action
    showAdminUsersFormAction(req, res, next) {
        switch(req.body.action){
            case 'delete':
                User.delete({_id: {$in: req.body.courseUserIDS}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!'});
        }
    }

    //[PUT] /admin/users/:id
    showDetailUsersEdit(req,res,next){
        //{_id: req.params.id} lấy id để tìm mà mình đã có rồi, req.body là dữ liệu object muốn chỉnh sửa
        User.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/users'))
            .catch(next);
    }

    //[GET] /admin/users/:id/edit
    showAdminDetailUsers(req,res,next){
        
            User.findById(req.params.id)
                .then(adminInfo => 
                    
                    res.render('admin/usersManagerEdit', {adminInfo: mongooseToObject(adminInfo)
                }))
                .catch(next);
    }

    //[DELETE] /admin/users/:id
    showUsersDeleted(req,res,next){
        User.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[GET] /admin/trashcanuser
    showTrashCanUser(req,res,next){
        var token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        try {
            var decodeToken = jwt.verify(token, 'mk');
            User.findOne({ _id: decodeToken._id })
                .then(adminInfo => {
                    let courseQuery = User.findWithDeleted({ deleted: true });

                    if (req.query.hasOwnProperty('_sort')) {
                        courseQuery = courseQuery.sort({
                            [req.query.column]: req.query.type
                        });
                    }

                    Promise.all([courseQuery, Course.countDocumentsWithDeleted({ deleted: true }),User.countDocumentsWithDeleted({ deleted: true })])
                        .then(([adminFindDeleted, deletedCount,deletedCountUser]) => {
                            res.render('admin/trashcanuser', {
                                adminInfo: mongooseToObject(adminInfo),
                                deletedCount,deletedCountUser,
                                adminFindDeleted: mutipleMongooseToObject(adminFindDeleted),
                            });
                        })
                        .catch(next);
                })
                .catch(next);
        } catch (err) {
            res.redirect('/login');
        }
        //res.render('admin/trashcanuser')
    }

    //[POST] /trashcanuser/form-actions
    showTrashCanUserFormAction(req,res,next){
        switch(req.body.action){
            case 'restore':
                User.restore({_id: {$in: req.body.userIDS}})  
                    //console.log('hi')   
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'deleteVV':
                User.deleteMany({_id: {$in: req.body.userIDS}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is invalid!'});
        }
    }

    //[PATCH] /trashcanuser/:id/restore
    showTrashCanUserRestore(req,res,next){
        User.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /trashcanuser/:id/delete
    showTrashCanUserDeleted(req,res,next){
        User.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[GET] /admin/code
    showAdminCode(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        //console.log(users);
                        Course.findOne({ create: req.params.create })
                            .then(course => {
                                Course.countDocumentsWithDeleted({ deleted: true })
                                    .then(deletedCount => {
                                        User.countDocumentsWithDeleted({ deleted: true })
                                        .then(deletedCountUser => {
                                            res.render('admin/code', {
                                                adminInfo: mongooseToObject(adminInfo),
                                                course: mongooseToObject(course),
                                                deletedCount,deletedCountUser,
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

    //[POST] /admin/coded
    showAdminCodeAdd(req,res,next){
        const quatity1 = req.body.quatity1;
        const quatity2 = req.body.quatity2;
        const quatity3 = req.body.quatity3;
        const quatity4 = req.body.quatity4;
        var integerNumber1 = parseInt(quatity1, 10);
        var integerNumber2 = parseInt(quatity2, 10);
        var integerNumber3 = parseInt(quatity3, 10);
        var integerNumber4 = parseInt(quatity4, 10);

        
        
        const codeProperties = [
            { formData: req.body.code1, nameCode: req.body.nameCode1, priceCode: req.body.price1, imageCode: req.body.imageCode1, quatity: integerNumber1, letterNumber: req.body.letterNumber1, model: Code1 },
            { formData: req.body.code2, nameCode: req.body.nameCode2, priceCode: req.body.price2, imageCode: req.body.imageCode2, quatity: integerNumber2, letterNumber: req.body.letterNumber2, model: Code2 },
            { formData: req.body.code3, nameCode: req.body.nameCode3, priceCode: req.body.price3, imageCode: req.body.imageCode3, quatity: integerNumber3, letterNumber: req.body.letterNumber3, model: Code3 },
            { formData: req.body.code4, nameCode: req.body.nameCode4, priceCode: req.body.price4, imageCode: req.body.imageCode4, quatity: integerNumber4, letterNumber: req.body.letterNumber4, model: Code4 }
        ];
    
        let successCount = 0;
        let errorCount = 0;
        let totalCount = codeProperties.length;
        
        const promises = codeProperties.map(({ formData, nameCode, priceCode, imageCode, quatity, letterNumber, model }) => {
            if (formData) {
                const arr = formData.split("\r\n");
                const objectsArray = arr.map(element => ({
                    nameCode,
                    code: element,
                    price: priceCode,
                    image: imageCode,
                    quatity,
                    letterNumber
                }));
                console.log(objectsArray)
                const savePromises = objectsArray.map(obj => {
                    const newObj = new model(obj);
                    return newObj.save()
                        .then(() => {
                            console.log('Lưu vào cơ sở dữ liệu thành công');
                            successCount++;
                        })
                        .catch(error => {
                            console.error('Lỗi khi lưu vào cơ sở dữ liệu:', error);
                            errorCount++;
                        });
                });
    
                return Promise.all(savePromises);
            } else {
                totalCount--; // Giảm tổng số loại mã nếu không có dữ liệu đầu vào
                return Promise.resolve(); // Trả về một Promise resolved nếu không có dữ liệu đầu vào
            }
        });
    
        Promise.all(promises)
            .then(() => {
                // Nếu đã xử lý xong tất cả các đối tượng trong mảng
                if (errorCount === 0) {
                    // Nếu không có lỗi, chuyển hướng về /admin/code
                    res.redirect('/admin/code');
                } else {
                    // Nếu có lỗi, cũng chuyển hướng về /admin/code
                    res.redirect('/admin/code');
                }
            })
            .catch(err => {
                console.error('Lỗi xử lý Promise:', err);
                res.redirect('/admin/code'); // Xử lý lỗi và chuyển hướng
            });
    }

    //[GET] /admin/combocode
    showAdminComboCode(req,res,next){
        try {
            const token = req.cookies.token; // Lấy token từ yêu cầu
            if (!token) {
                throw new Error('No token provided');
            }
    
            const decodeToken = jwt.verify(token, 'mk');
            
            User.findOne({ _id: decodeToken._id })
                .then(admin => {
                    if (!admin) {
                        throw new Error('User not found');
                    }
    
                    // Truy vấn để đếm số lượng tài liệu đã xóa
                    Course.countDocumentsWithDeleted({ deleted: true })
                        .then(deletedCount => {
                            User.countDocumentsWithDeleted({ deleted: true })
                                .then(deletedCountUser => {
                                    res.render('admin/combocode', {
                                        admin: mongooseToObject(admin), // Đảm bảo là một user, không phải users
                                        deletedCount,deletedCountUser,
                                    });
                                })
                                .catch(next);
                        })
                        .catch(next);
                })
                .catch(next);
        } catch (err) {
            // Xử lý lỗi khi giải mã token không thành công
            console.error('Error decoding token:', err);
            res.redirect('/login'); // Chuyển hướng người dùng đến trang đăng nhập hoặc thực hiện hành động phù hợp khác
        }
        //res.render('admin/combocode')
    }

    //[POST] /admin/combocodeadd
    showAdminComboCodeAdd(req,res,next){
        const nameCombo = req.body.nameCombo;
        const code1 = req.body.code1.split('\r\n');
        const code2 = req.body.code2.split('\r\n');
        const code3 = req.body.code3.split('\r\n');
        const code4 = req.body.code4.split('\r\n');
        const nameCode1 = req.body.nameCode1;
        const nameCode2 = req.body.nameCode2;
        const nameCode3 = req.body.nameCode3;
        const nameCode4 = req.body.nameCode4;
        const priceCode = req.body.price;
        const imageCode1 = req.body.imageCode1;
        const imageCode2 = req.body.imageCode2;
        const imageCode3 = req.body.imageCode3;
        const imageCode4 = req.body.imageCode4;
        const letterNumber = req.body.letterNumber;

        const newArray = [];
        for(let i=0; i<code1.length; i++){
            newArray.push({
                code1: code1[i],
                code2: code2[i],
                code3: code3[i],
                code4: code4[i]
            });
        }
        
        //console.log(newArray);
        const newArrayWithAdditionalProps = newArray.map((item, index) => {
            return {
                ...item,
                nameCode1: nameCode1,
                nameCode2: nameCode2,
                nameCode3: nameCode3,
                nameCode4: nameCode4,
                price: priceCode,
                image1: imageCode1,
                image2: imageCode2,
                image3: imageCode3,
                image4: imageCode4,
                nameCombo:nameCombo,
                letterNumber:letterNumber,
            };
        });
        
        //console.log(newArrayWithAdditionalProps);
        const saveData = () => {
            // Lưu từng đối tượng trong mảng newArray vào cơ sở dữ liệu
            Promise.all(newArrayWithAdditionalProps.map((item) => {
                const newItem = new ComboCode(item); // Tạo một đối tượng mới của model của bạn
                return newItem.save(); // Lưu đối tượng vào cơ sở dữ liệu và trả về một promise
            }))
            .then(() => {
                // Nếu mọi thứ diễn ra thành công, thực hiện chuyển hướng đến '/admin/combocode'
                res.redirect('/admin/combocode');
            })
            .catch((error) => {
                // Nếu có lỗi xảy ra trong quá trình lưu dữ liệu, thực hiện chuyển hướng đến '/admin/code'
                res.redirect('/admin/code');
            });
        };
        
        saveData();
    }

    //[GET] /admin/infocode
    showAdminInfoCode(req,res,next){
        var token = req.cookies.token;
        if (token) { // Kiểm tra xem có token không
            try {
                var decodeToken = jwt.verify(token, 'mk');
                User.findOne({ _id: decodeToken._id })
                    .then(adminInfo => {
                        //console.log(users);
                        InfoCode.findOne({ create: req.params.create })
                            .then(infoCode => {
                                Course.countDocumentsWithDeleted({ deleted: true })
                                    .then(deletedCount => {
                                        User.countDocumentsWithDeleted({ deleted: true })
                                        .then(deletedCountUser => {
                                            res.render('admin/infocode', {
                                                adminInfo: mongooseToObject(adminInfo),
                                                infoCode: mongooseToObject(infoCode),
                                                deletedCount,deletedCountUser,
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

    //[POST] /admin/infocoded
    showAdminInfoCodeAdd(req,res,next){
        // const nameCode = req.body.nameCode;
        // const detail = req.body.detail;
        // const image = req.body.image;
        // const price = req.body.price;
        // const letterNumber = req.body.letterNumber;
        const formData = req.body;
        //formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8larDycSRqXaRytdeQKkFYM0ALA`;
        const create = new InfoCode(formData);
        console.log(create);
        create.save()
            .then(() => {
                // Thêm thông báo cảnh báo vào đây
                res.redirect('/admin/infocode');
            })
            .catch(error => {
                req.session.error = "Lỗi: Không thể lưu dữ liệu. Vui lòng thử lại sau.";
                res.redirect('back'); // Redirect lại trang hoặc back sau khi lưu thông báo lỗi vào session
            });
    }
    //[GET] /admin/codeorder
    showAdminCodeOrder(req,res,next){
        res.render('admin/codeAdminOrder')
    }

    //[GET] /admin/add-reroll-htng
    showAddReRollHTNG(req,res,next){
        res.render('admin/addAccReRollHTNG')
    }

}

module.exports = new AdminManagerController;

