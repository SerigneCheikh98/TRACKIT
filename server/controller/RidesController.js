"use strict";
const dayjs = require('dayjs')
const ridesQuery = require('../query/RidesQuery')
const notificationQuery = require('../query/NotificationQuery')




function afterHour(timeChosen, timeReceived) {
    const time1 = timeChosen.split(':')
    const time2 = timeReceived.split(':')

    if(time2[0] > time1[0])
        return true
    else if(time2[0] === time1[0] && time2[1] >= time1[1])
        return true
    else 
        return false
}

function calculateEndingHour(startingTime, slots) {
    const noHours = Math.floor(slots / 2);
    const noAfHour = slots - (noHours * 2);

    const start = startingTime.split(':').map(item => parseInt(item))
    start[0] = start[0] + noHours
    start[1] = start[1] + noAfHour*30

    if(start[1] == 60) {
        start[1] = 0
        start[0] += 1
    }

    const s = `${start[0] < 10 ? '0'+start[0] : start[0]}:${start[1] < 10 ? '0'+start[1] : start[1]}`
    return s
}
/**
 * Search for a still pending ride for the current user
 * 
 * The student ask according to the following parameters which define the req object
 * 
 * !NOTE: req object is sent using URL so data is inside the req.query 
 * 
 * req {
 *  location: String - whatever, is not going to be used for the prototype
 *  date: String - format `YYYY/MM/DD`
 *  time: String - format `HH:mm` so in 24 hours
 *  duration: Number - this value is going to be parsed in time slot in the teacher side
 *  timeUnit: String ('min' or 'hours')
 * }
 * 
 * res {
 *  userId: Number,
 *  name: String,
 *  surname: String
 *  rating: Number,
 *  distance: Number,
 *  from: String,
 *  to: String
 * }
 * @param {*} req obj
 * @param {*} res [{ride_obj1}, {ride_obj2}, ...]
 */
exports.searchRide = function searchRide(req, res) {
    if(!req.query.location) {
        return res.status(400).json({message: 'Location is missing'})
    }
    if(!req.query.date) {
        return res.status(400).json({message: 'Date is missing or not valid'})
    }
    if(!req.query.time || req.query.time.split(':').length != 2) {
        return res.status(400).json({message: 'Time is missing or not valid'})
    }
    if(!req.query.duration || req.query.duration <= 0) {j
        return res.status(400).json({message: 'Duration is missing or not valid'})
    }
    if(!req.query.timeUnit || !(req.query.timeUnit == 'min' || req.query.timeUnit == 'hours')) {
        return res.status(400).json({message: 'Time unit is missing or not valid'})
    }

    if(req.query.timeUnit === 'hours')
        req.query.duration *= 60

    const slots = req.query.duration/30 
    ridesQuery.searchRide(req.query.location, req.query.date, req.query.time, slots)
        .then( resp => {
            resp = resp.filter( (ride) => {
                return afterHour(req.query.time, ride.StartingTime) 
            })
            .filter( (ride) => {
                return afterHour(dayjs().format('HH:mm'), ride.StartingTime)
            })
            resp = resp.map( item => {
                return {
                    userId: item.DriverId,
                    name: item.Name,
                    lastname: item.Surname,
                    rating: item.Rating,
                    distance: Math.floor(Math.random()*100),
                    date: item.Date,
                    from: item.StartingTime,
                    to: calculateEndingHour(item.StartingTime, item.Slot)
                }
            })
            res.status(200).json(resp)
        })
        .catch( err => {
            res.status(500).json({message: 'DB error'})
        })
}

/**
 * The currect logged in student ask for a practice request to any available driver because there were none 
 * when he searched for it. Same parameters of the previous performed search are going to be used
 * 
 * 
 * req {
 *  location: String - whatever, is not going to be used for the prototype
 *  date: String - format `YYYY/MM/DD`
 *  time: String - format `HH:mm` so in 24 hours
 *  duration: Number - this value is going to be parsed in time slot in the teacher side
 *  timeUnit: String ('min' or 'hours')
 * }
 * @param {*} req obj
 * @param {*} res {
 *  message: 'Request sent'
 * }
 */
exports.addRequestRide = function addRequestRide(req, res) {
    if(!req.body.location || req.body.location.trim() == '') {
        return res.status(400).json({message: 'Location is missing'})
    }
    if(!req.body.date) {
        return res.status(400).json({message: 'Date is missing or not valid'})
    }
    if(!req.body.time || req.body.time.split(':').length != 2) {
        return res.status(400).json({message: 'Time is missing or not valid'})
    }
    if(!req.body.duration || req.body.duration <= 0) {j
        return res.status(400).json({message: 'Duration is missing or not valid'})
    }
    if(!req.body.timeUnit || !(req.body.timeUnit == 'min' || req.body.timeUnit == 'hours')) {
        return res.status(400).json({message: 'Time unit is missing or not valid'})
    }

    if(req.body.timeUnit === 'hours')
    req.body.duration *= 60

    const slots = req.body.duration/30
    ridesQuery.addRequestRide(req.user.id, req.body.location, req.body.date, req.body.time, slots)
        .then( resp => {
            notificationQuery.addNotification(req.user.id, resp, 'new notification', 'Pending')
            return res.status(200).json({message: 'Request sent'})
        })
        .catch( err => {
            console.log(err)
            return res.status(500).json({message: 'DB error'})
        })
}