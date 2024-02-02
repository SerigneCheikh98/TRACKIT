const db = require('../db')

exports.deleteNotification = function deleteNotification(student_id, id) {
    const sql = `DELETE FROM Notifications WHERE idUser = ? AND idRide = ?`
    return new Promise((resolve, reject) => {
        db.run(sql, [student_id, id], function (err) {
            if (err) {
                reject(new Error(err.message))
                return
            }
            resolve(this.changes);
        })
    })
}

// delete the request to driver notification

exports.deleteNotificationDriver = function deleteNotification(student_id) {
    const sql = `DELETE FROM Notifications WHERE idUser = ? AND type = 'driver'`
    return new Promise((resolve, reject) => {
        db.run(sql, [student_id], function (err) {
            if (err) {
                reject(new Error(err.message))
                return
            }
            resolve(this.changes);
        })
    })
}

exports.setNotificationSeen = function setNotificationSeen(student_id, notification_id) {
    const sql = `UPDATE Notifications SET seen = 1 WHERE id = ? and idUser = ?`
    return new Promise((resolve, reject) => {
        db.run(sql, [notification_id, student_id], function (err) {
            if (err) {
                reject(new Error(err.message))
                return
            }
            if (this.changes === 0) {
                reject(new Error('No rows updated'));
                return;
            }
            resolve(this.changes);
        })
    })
}

exports.getNotificationApproved = function getNotificationApproved(student_id) {
    const sql = `SELECT N.id, N.idRide, D.Name, D.Surname, R.Date, R.StartingTime, R.Slot, N.status, N.seen
                    FROM Notifications N, Rides R, Drivers D 
                    WHERE N.idUser = ? AND N.idRide = R.RideId AND
                    R.DriverId = D.Id`
    return new Promise((resolve, reject) => {
        db.all(sql, [student_id], (err, rows) => {
            if (err) {
                reject(new Error(err.message))
                return
            }
            if (!rows) {
                resolve([])
                return;
            }
            resolve(rows);
        })
    })
}

exports.getNotificationPending = function getNotificationPending(student_id) {
    const sql = `SELECT N.id, N.idRide, R.Date, R.StartingTime, R.Slot, N.status, N.seen
                    FROM Notifications N, Rides R 
                    WHERE N.idUser = ? AND N.idRide = R.RideId AND R.DriverId IS NULL`
    return new Promise((resolve, reject) => {
        db.all(sql, [student_id], (err, rows) => {
            if (err) {
                reject(new Error(err.message))
                return
            }
            if (!rows) {
                resolve([])
                return;
            }
            resolve(rows);
        })
    })
}

exports.addNotification = function addNotification(student_id, ride_id, text, status) {
    const sql = `INSERT INTO Notifications(idUser, idRide, text, status, seen)
                    VALUES(?, ?, ?, ?, 0)`
    return new Promise((resolve, reject) => {
        db.run(sql, [student_id, ride_id, text, status], function (err) {
            if (err) {
                reject(new Error(err.message))
                return
            }
            if (this.changes === 0) {
                reject(new Error('No rows added'));
                return;
            }
            resolve(this.changes);
        })
    })
}