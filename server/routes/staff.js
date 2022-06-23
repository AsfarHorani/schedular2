const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff')

//auth
router.post('/staff-signin', staffController.signin);
router.post('/staff-signup', staffController.signup);

//getTimeTable
router.get('/getTimetable/:id',staffController.getTimeTable);

//get staff

router.get('/getAllStaff',staffController.getAllStaff);
router.get('/getStaff/:id', staffController.getStaff);
module.exports = router;