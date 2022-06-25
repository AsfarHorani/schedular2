const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student')
const upload = require('../utils/multer')
const Student = require('../models/student');
const { body, check } = require('express-validator');

//auth
router.post('/student-signin', studentController.signin);
router.post('/student-signup', [
    body('email', "email has to be valid").isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail().custom(async value => {
            const student = await Student.findOne({ email: value });
            if (student) {
                return Promise.reject('Email already in use by an student');
            }
        }),
    body('rollNo', "rollNo has to be valid").isNumeric()
        .withMessage('Please enter a valid and numeric rollNo, It should be of length 5').isLength({ min: 5, max: 5 }).withMessage("UserId should be a valid number of length 5")
        .custom(async value => {
            const student = await Student.findOne({ rollNo: value });
            if (student) {
                return Promise.reject('This rollNo has already assigned to someone');
            }
        }),
    body('password', 'Password has to be valid.')
        .isLength({ min: 8 })
        .trim()
        .isEmpty()
    ,

    body('name', "Name is't correct")
        .trim()
        .isLength({ min: 3 }),

    body('depart', "depart is't correct, min length 3")
        .trim()

], studentController.signup);
router.post('/student-uploadTimeTable', upload.single('file'), studentController.uploadTimeTable);
router.get('/getStudents', studentController.getAllStudents)
router.get('/getStudent/:id', studentController.getStudent)
router.put('/editStudent/:id', studentController.editStudent);
router.post('/addStudentRow/:id', studentController.addStudentRow)
module.exports = router;