const ridesController = require('../controller/RidesController')

const express = require('express');


const router = express.Router();

router.post('/login')
router.delete('/logout')
router.get('/loggedin')

// fake registration
router.post('/register')

// search a ride
router.get('/rides', ridesController.searchRide);

// book a practice for the current student
router.put('/rides')

// request by the current student
router.post('/rides')

// get all topics
router.get('/topic')

// get all evaluations for the student
router.get('/evaluations')

// delete a notification for a student
router.delete('/notification/:id')

module.exports = router;