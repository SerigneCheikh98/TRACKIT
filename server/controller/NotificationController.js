'use state'
const notificationQuery = require('../query/NotificationQuery')
const ridesQuery = require('../query/RidesQuery')
/**
 * Given a logged in student, deleting a notification action is performend 
 * throught this function call
 * 
 * We expect the student logged id so its id is going to be taken from the 
 * authorization phase
 * 
 * The id of the notification is received by parameter using req.params.id
 * 
 * The id and the status of the ride are sent using the body instead
 * @param {*} req {
 *  id: INTEGER
 *  status: INTEGER,
 * }
 * @param {*} res {
 *  message: String
 * }
 */
exports.deleteNotification = async function deleteNotification(req, res) {
    if(!req.params.id || req.params.id < 0) {
        return res.status(400).json({message: 'Id is missing or not valid'})
    }
    if( (await ridesQuery.selectRide(req.params.id)) == undefined ) {
        return res.status(400).json({message: 'Ride is missing or not valid'})
    }  
    notificationQuery.deleteNotification(req.user.id, req.params.id)
        .then((result) => {
            if(req.body.status === 'Approved') {
                ridesQuery.deleteBooking(req.user.id, req.params.id)
                    .then( inner => {
                        return res.status(200).json({message: 'Deleted'})
                    })
                    .catch( err => console.log(err))
            }
            else {
                ridesQuery.deleteRequestRide(req.user.id, req.params.id)
                    .then( inner => {
                        return res.status(200).json({message: 'Deleted'})
                    })
                    .catch( err => console.log(err))
            }
        }).catch((err) => {
            return res.status(500).json({message: 'DB error'})
    });
}

/**
 * Given a logged in student, getting all its notification action is performend 
 * throught this function call
 * 
 * We expect the student logged id so its id is going to be taken from the 
 * authorization phase
 * 
 * Different types of notification will be sent to the client
 * 
 * 
 * @param {*} req None
 * @param {*} res [
 *  {notificationObj1},
 *  ...
 * ]
 */
exports.getNotification = function getNotification(req, res) {
    notificationQuery.getNotificationApproved(req.user.id)
        .then((result) => {
            notificationQuery.getNotificationPending(req.user.id)
                .then( inner => {
                    let rows = inner.concat(result)
                    rows = rows.map( item => {
                        let s = ''
                        const hours = Math.floor(item.Slot / 2)
                        const alf = item.Slot - hours
                        if(hours == 0) {
                            s = `30 minutes`
                        }
                        else if(alf == 1) {
                            s = `${hours} hour(s) and 30 minutes`
                        }
                        else {
                            s = `${hours} hour(s)`
                        }
    
                        return {
                            bookingId: item.idRide,
                            driverName: item.Name == undefined && item.Surname == undefined ? null : `${item.Name} ${item.Surname}` ,
                            Date: item.Date,
                            time: item.StartingTime,
                            duration: s,
                            state: item.status
                        }
                    })
                    return res.status(200).json(rows)
                    
                })
                .catch( err => console.log(err) )
            
        }).catch((err) => {
            return res.status(500).json({message: 'DB error'})
    });
}