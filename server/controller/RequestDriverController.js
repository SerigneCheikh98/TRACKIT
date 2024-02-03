"use strict";
const dao = require('../query/RequestToDriver');
const notificationQuery = require('../query/NotificationQuery')


exports.addRequest = function addRequest(req, res) {
    dao.setReqStatus(req.user.id)
        .then( resp => {
            //notificationQuery.addNotification(req.user.id, resp, 'new notification', 'Pending')
            return res.status(200).json({message: 'Request sent'})
        })
        .catch( err => {
            console.log(err);
            return res.status(500).json({message: 'DB error'})
        })
}

exports.deleteRequest = function deleteRequest(req, res) {
    dao.deleteReq(req.user.id)
        .then( resp => {
            //notificationQuery.deleteNotification(req.user.id, resp)
            return res.status(200).json({message: 'Request sent'})
        })
        .catch( err => {
            console.log(err);
            return res.status(500).json({message: 'DB error'})
        })
}