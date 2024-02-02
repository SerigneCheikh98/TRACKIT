"use strict";
const dao = require('../query/RequestToDriver');
const notificationQuery = require('../query/NotificationQuery')


exports.addRequest = function setReqStatus(req, res) {
    dao.setReqStatus()
        .then( resp => {
            notificationQuery.addNotification(req.user.id, resp, 'new notification', 'Pending')
            return res.status(200).json({message: 'Request sent'})
        })
        .catch( err => {
            return res.status(500).json({message: 'DB error'})
        })
}