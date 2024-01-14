const ridesController = require('../controller/RidesController')

const express = require('express');


const router = express.Router();


router.get('/rides', ridesController.searchRide);

module.exports = router;