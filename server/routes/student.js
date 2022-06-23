const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student')
const upload = require('../utils/multer')

//auth
router.post('/student-signin', studentController.signin);
router.post('/student-signup', studentController.signup);
router.post('/student-uploadTimeTable',upload.single('file'), studentController.uploadTimeTable);
router.get('/getStudents',studentController.getAllStudents)

module.exports = router;