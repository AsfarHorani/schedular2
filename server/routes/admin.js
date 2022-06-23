const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')
const upload = require('../utils/multer')

//auth
router.post('/admin-signin', adminController.signin);
router.post('/admin-signup', adminController.signup);
router.post('/admin-uploadTimeTable',upload.single('file'), adminController.uploadTimeTable);
router.get('/getAdmins',adminController.getAllAdmins)

module.exports = router;