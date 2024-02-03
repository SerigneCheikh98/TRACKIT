"use strict";
const dayjs = require('dayjs')
const ridesQuery = require('../query/RidesQuery')
const notificationQuery = require('../query/NotificationQuery')



/**
 * timeChosen is before timeReceived ==> first time chosen
 * 12:00 and 20:00 return true
 * 12:00 and 08:00 return false
 */
function afterHour(timeChosen, timeReceived) {
    const time1 = timeChosen.split(':').map(item => parseInt(item))
    const time2 = timeReceived.split(':').map(item => parseInt(item))

    // if(time2[0] > time1[0])
    //     return true
    // else if(time2[0] === time1[0] && time2[1] >= time1[1])
    //     return true
    // else 
    //     return 
    if( ( (time1[0]*60+time1[1]) - (time2[0]*60+time2[1]) ) < 0)
        return true 
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

function getSlotDistance(time1, time2) {
    const from = time1.split(':').map(i => parseInt(i))
    const to = time2.split(':').map(i => parseInt(i))

    const min_to = to[0]*60+to[1]
    const min_from = from[0]*60+from[1]

    return Math.round((min_from-min_to)/30)
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
    console.log(req.query.timeUnit)
    console.log(req.query.duration)
    const slots = Math.round(req.query.duration/30) 
    console.log(slots)
    ridesQuery.searchRide(req.query.location, req.query.date, req.query.time, slots)
        .then( resp => {
            resp = resp.filter( (ride) => {
                return afterHour(req.query.time, ride.StartingTime) 
            })
            console.log(resp)
            if(dayjs().isSame(req.query.date, 'day')) {
                resp = resp.filter( (ride) => {
                    return afterHour(dayjs().format('HH:mm'), ride.StartingTime)
                })
            }
            
            resp = resp.map( item => {
                return {
                    userId: item.DriverId,
                    name: item.Name,
                    lastname: item.Surname,
                    rating: item.Rating,
                    distance: Math.floor(Math.random()*100),
                    date: item.Date,
                    from: item.StartingTime,
                    description : item.Description,
                    rideId : item.RideId,
                    to: calculateEndingHour(item.StartingTime, item.Slot),
                    
                }
            })
            res.status(200).json(resp)
        })
        .catch( err => {
            res.status(500).json({message: 'DB error'})
        })
}

/**
 * Book a ride with a driver and takes its availability, the remaining time is going to be
 * split in other rides
 * 
 * @param {*} req {
 *  rideId: INTEGER,
 *  time: STRING,
 *  slots: INTEGER
 * }
 * @param {*} res 
 * @returns 
 */
exports.bookRide = async function bookRide(req, res) {
    if(!req.body.rideId || req.body.rideId < 0) {
        return res.status(400).json({message: 'RideId is missing'})
    }
    if(!req.body.time || req.body.time.split(':').length != 2) {
        return res.status(400).json({message: 'Time is missing or not valid'})
    }
    if(!req.body.slots || req.body.slots < 1) {
        return res.status(400).json({message: 'Slot is missing or not valid'})
    }
    const ride = await ridesQuery.selectRide(req.body.rideId)
    const endingHour = calculateEndingHour(ride.StartingTime, ride.Slot)
    if(afterHour(req.body.time, ride.StartingTime) || afterHour(endingHour, calculateEndingHour(req.body.time, req.body.slots)))
        return res.status(400).json({message: 'Time for the slot is not compatible'})

    if(ride.StartingTime !== req.body.time || endingHour === calculateEndingHour(req.body.time, req.body.slots)) {
        const firstSlot = getSlotDistance(req.body.time, ride.StartingTime)
        await ridesQuery.addRide(ride.DriverId, ride.Location, ride.Date, ride.StartingTime, firstSlot)
    }
    
    if(ride.StartingTime === req.body.time || endingHour != calculateEndingHour(req.body.time, req.body.slots)) {
        const secondSlot = getSlotDistance(calculateEndingHour(ride.StartingTime, ride.Slot), calculateEndingHour(req.body.time, req.body.slots))
        await ridesQuery.addRide(ride.DriverId, ride.Location, ride.Date, calculateEndingHour(req.body.time, req.body.slots), secondSlot)
    }

    ridesQuery.bookRide(req.body.rideId, req.user.id, req.body.time, req.body.slots)
        .then( (resp) => {
            notificationQuery.addNotification(req.user.id, resp, 'new notification', 'Approved')
            return res.status(200).json({message: 'Booking complete'})
        })
        .catch( err => {
            return res.status(500).json({message: 'DB error'})
        })
 
}

exports.getDailyRide = function getDailyRide(req, res) {
    if(!req.query.location) {
        return res.status(400).json({message: 'Location is missing'})
    }
    if(!req.query.date) {
        return res.status(400).json({message: 'Date is missing or not valid'})
    }

    ridesQuery.getDailyRide(req.query.date)
        .then( resp => {
            if(dayjs().isSame(req.query.date, 'day')) {
                resp = resp.filter( (ride) => {
                    return afterHour(dayjs().format('HH:mm'), ride.StartingTime)
                })
            }
            
            resp = resp.map( item => {
                return {
                    userId: item.DriverId,
                    name: item.Name,
                    lastname: item.Surname,
                    rating: item.Rating,
                    distance: Math.floor(Math.random()*100),
                    date: item.Date,
                    from: item.StartingTime,
                    description : item.Description,
                    to: calculateEndingHour(item.StartingTime, item.Slot),
                    
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
            return res.status(500).json({message: 'DB error'})
        })
}