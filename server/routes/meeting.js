const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meeting')



router.post('/request-meeting',meetingController.requestMeeting);




module.exports = router;