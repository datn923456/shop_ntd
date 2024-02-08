const express = require('express');
const router = express.Router();

const adminManagerController = require('../app/controllers/AdminManagerController');

router.get('/admin', adminManagerController.adminManager);
router.get('/create', adminManagerController.showAdmin);
router.post('/store', adminManagerController.store);

module.exports = router;