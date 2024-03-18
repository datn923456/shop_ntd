const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../app/models/User');
const adminManagerController = require('../app/controllers/AdminManagerController');

var checkLogin = (req,res,next)=>{
    try{
        var token = req.cookies.token;
        var idUser = jwt.verify(token, 'mk')
        User.findOne({
            _id: idUser
        })
        .then(data =>{
            if(data){
                req.data = data;
                next()
            }else{
                res.json('NOT PERMISSON');
            }
        })
        .catch(err =>{

        })
        
    }catch (error){
        //res.status(500).json("loi ben server");
        return res.redirect('/login')
    }
    
}

var checkUser = (req,res,next)=>{
    var role = req.data.role
    if(role === 'user' || role === 'admin'){
        next()
    }else{
        res.json('NOT PERMISSION')
    }
}

var checkAdmin = (req,res,next)=>{
    var role = req.data.role
    if(role === 'admin'){
        next()
    }else{
        res.json('NOT PERMISSION')
    }
}

router.get('/create', adminManagerController.showAdminCreate);
router.post('/store', adminManagerController.store);
router.get('/update', adminManagerController.showAdminUpdate);

router.get('/code', adminManagerController.showAdminCode);
router.post('/coded', adminManagerController.showAdminCodeAdd);
// router.post('/coded1', adminManagerController.showAdminCodeAdd1);
// router.post('/coded2', adminManagerController.showAdminCodeAdd2);
// router.post('/coded3', adminManagerController.showAdminCodeAdd3);
// router.post('/coded4', adminManagerController.showAdminCodeAdd4);
router.get('/codeorder',adminManagerController.showAdminCodeOrder);

router.get('/combocode', adminManagerController.showAdminComboCode);
router.post('/combocodeadd', adminManagerController.showAdminComboCodeAdd);

router.get('/infocode', adminManagerController.showAdminInfoCode);
router.post('/infocoded', adminManagerController.showAdminInfoCodeAdd);

router.get('/users', adminManagerController.showAdminUsers);

router.get('/users/:id/edit', adminManagerController.showAdminDetailUsers);
router.put('/users/:id', adminManagerController.showDetailUsersEdit);
router.post('/update/form-actions',adminManagerController.showAdminUpdateFormAction);
router.post('/users/form-actions',adminManagerController.showAdminUsersFormAction);


router.delete('/users/:id',adminManagerController.showUsersDeleted);

router.get('/trashcanuser', adminManagerController.showTrashCanUser);
router.post('/trashcanuser/form-actions', adminManagerController.showTrashCanUserFormAction);
router.patch('/trashcanuser/:id/restore', adminManagerController.showTrashCanUserRestore);
router.delete('/trashcanuser/:id/delete', adminManagerController.showTrashCanUserDeleted);

router.get('/add-reroll-htng',adminManagerController.showAddReRollHTNG);
router.post('/add-accreroll',adminManagerController.showAddACCReRollHTNG);

router.get('/doanhthu',adminManagerController.showDoanhThu)


router.post('/trashcan/form-actions',adminManagerController.showAdminTrashCanFormAction);
router.get('/update/:id/edit', adminManagerController.showDetailUpdate);
router.put('/update/:id', adminManagerController.showDetailUpdateEdited);
router.delete('/update/:id', adminManagerController.showUpdateDeleted);
router.patch('/trashcan/:id/restore', adminManagerController.showUpdateTrashCan);
router.delete('/trashcan/:id/delete', adminManagerController.showTrashCanDeleted);
router.get('/trashcan', adminManagerController.showTrashCan);
router.get('/', adminManagerController.adminManager);
router.get('/logout', function(req, res) {
    // Xóa cookie
    res.clearCookie('token'); // Thay 'cookieName' bằng tên của cookie bạn muốn xóa
    // Gửi phản hồi về cho client
    res.redirect('/login');
});

module.exports = router;