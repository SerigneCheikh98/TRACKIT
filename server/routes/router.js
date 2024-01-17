const notificationController = require('../controller/NotificationController');
const ridesController = require('../controller/RidesController')
const reportController = require('../controller/ReportController')

const express = require('express');


const router = express.Router();

// fake registration
router.post('/register')

// search a ride
router.get('/rides', ridesController.searchRide);

// book a practice for the current student
router.put('/rides')

// request by the current student
router.post('/rides', ridesController.addRequestRide)

// get all topics
router.get('/topics', reportController.getAllTopics)

// get all evaluations for the student
router.get('/evaluations')

// get all the notification for the student
router.get('/notification', notificationController.getNotification)

// delete a notification for a student
router.delete('/notification/:id', notificationController.deleteNotification)


module.exports = router;