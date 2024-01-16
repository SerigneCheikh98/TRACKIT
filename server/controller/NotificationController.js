'use state'
const notificationQuery = require('../query/NotificationQuery')

/**
 * Given a logged in student, deleting a notification action is performend 
 * throught this function call
 * 
 * We expect the student logged id so its id is going to be taken from the 
 * authorization phase
 * 
 * The id of the notification is received by parameter using req.params.id
 * 
 * TODO: the id of the student should be taken for the authentication process
 * 
 * @param {*} req None
 * @param {*} res {
 *  message: String
 * }
 */
exports.deleteNotification = function deleteNotification(req, res) {
    const student_id = 1        // TODO
    
    if(!req.params.id || req.params.id < 0) {
        return res.status(400).json({message: 'Id is missing or not valid'})
    }

    notificationQuery.deleteNotification(student_id, req.params.id)
        .then((result) => {
            return res.status(200).json({message: 'Deleted'})
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
    notificationQuery.getNotification(req.user.id)
        .then((result) => {
            return res.status(200).json(result)
        }).catch((err) => {
            return res.status(500).json({message: 'DB error'})
    });
}
