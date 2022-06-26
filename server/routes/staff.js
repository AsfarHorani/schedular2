const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff')
const Staff = require("../models/staff");
const { body, check } = require('express-validator');
const adminAuth = require("../utils/adminAuth");
const staffAuth = require("../utils/teacherAuth")


router.post('/staff-signin', staffController.signin);
router.post('/staff-signup', [
    body('email', "email has to be valid").isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail().custom(async value => {
            const staff = await Staff.findOne({ email: value });
            if (staff) {
                return Promise.reject('Email already in use by an staff');
            }
        }),
    body('userId', "userId has to be valid").isNumeric()
        .withMessage('Please enter a valid and numeric userId, It should be of length 5').isLength({ min: 5, max: 5 }).withMessage("UserId should be a valid number of length 5")
        .custom(async value => {
            const staff = await Staff.findOne({ userId: value });
            if (staff) {
                return Promise.reject('This userId has already assigned to someone');
            }
        }),
    body('password', 'Password has to be valid.')
        .isLength({ min: 8 }),

    body('name', "Name is't correct")
        .trim()
        .isLength({ min: 3 }),

    body('username', "username is't correct,min length 5")
        .isLength({ min:5 })
        .trim(),
    body('depart', "depart is't correct, min length 3")
        .trim()
        .isLength({ min: 3 }),
    body('qualification', "qualification is't correct, min length 3")

        .trim()
        .isLength({ min: 3 }),
],adminAuth, staffController.signup);

//getTimeTable
router.get('/getTimetable/:id', staffController.getTimeTable);

//get staff

router.get('/getAllStaff',adminAuth, staffController.getAllStaff);
router.get('/getStaff/:id', staffController.getStaff);



//put

router.put('/editStaff/:id',adminAuth, staffController.editStaff);


//delete

router.delete('/deleteStaff/:id',adminAuth, staffController.deleteStaff);
router.post('/staff-deleteRow/:id',adminAuth, staffController.deleteStaffRow);
router.post('/addStaffRow/:id',adminAuth, staffController.addStaffRow);

router.post('/addOfficeHours/:id',staffAuth, staffController.addOfficeHours);
module.exports = router;



