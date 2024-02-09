const express = require('express');
const router = express.Router();

const adminManagerController = require('../app/controllers/AdminManagerController');


router.get('/create', adminManagerController.showAdminCreate);
router.post('/store', adminManagerController.store);
router.get('/update', adminManagerController.showAdminUpdate);
router.get('/update/:id/edit', adminManagerController.showDetailUpdate);
router.put('/update/:id', adminManagerController.showDetailUpdateEdited);
router.delete('/update/:id', adminManagerController.showUpdateDeleted);
router.patch('/trashcan/:id/restore', adminManagerController.showUpdateTrashCan);
router.delete('/trashcan/:id/delete', adminManagerController.showTrashCanDeleted);
router.get('/trashcan', adminManagerController.showTrashCan);
router.get('/', adminManagerController.adminManager);

module.exports = router;