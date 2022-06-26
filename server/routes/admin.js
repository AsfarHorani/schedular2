const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')
const upload = require('../utils/multer')
const { body, check } = require('express-validator');
const Admin = require('../models/admin');
const adminAuth = require("../utils/adminAuth");
//auth

router.post('/admin-signin', adminController.signin);
router.post('/admin-signup', [
    body('email', "email has to be valid").isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail().custom(async value => {
            const admin = await Admin.findOne({ email: value });
            if (admin) {
                return Promise.reject('Email already in use by an admin');
            }
        }),
    body('password', 'Password has to be valid.')
        .isLength({ min: 8 })
        .trim(),

    body('name', "Name is't correct")
        .trim()
        .isLength({ min: 3 }),
], adminController.signup);
router.post('/admin-uploadTimeTable', adminAuth,upload.single('file'), adminController.uploadTimeTable);
router.get('/getAdmins',adminAuth, adminController.getAllAdmins)
router.get('/getAdmin/:id',adminAuth, adminController.getAdmin)
router.put('/editAdmin/:id',adminAuth, adminController.editAdmin);
router.delete('/deleteAdmin/:id',adminAuth, adminController.deleteAdmin);

module.exports = router;