const notificationController = require('../controller/NotificationController');
const ridesController = require('../controller/RidesController')
const reportController = require('../controller/ReportController')

const express = require('express');


const router = express.Router();

// fake registration
router.post('/register')

// search a ride
router.get('/rides', ridesController.searchRide);

// get daily rides
router.get('/rides/daily', ridesController.getDailyRide);

// book a practice for the current student
router.put('/rides')

// request by the current student
router.post('/rides', ridesController.addRequestRide)

// get all topics
router.get('/topics', reportController.getAllTopics)

// get all evaluations of the logged student
router.get('/evaluations', reportController.getEvaluationsByStudentId)

// get all evaluations for the student
router.get('/evaluations')

// get all the notification for the student
router.get('/notification', notificationController.getNotification)

// set at seen the notification for the student
router.put('/notification/:id', notificationController.setNotificationSeen)

// delete a notification for a student
router.delete('/notification/:id', notificationController.deleteNotification)


module.exports = router;