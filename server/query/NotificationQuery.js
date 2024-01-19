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

exports.getNotificationApproved = function getNotificationApproved(student_id) {
    const sql = `SELECT N.idRide, D.Name, D.Surname, R.Date, R.StartingTime, R.Slot, N.status
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
    const sql = `SELECT N.idRide, R.Date, R.StartingTime, R.Slot, N.status
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
    const sql = `INSERT INTO Notifications(idUser, idRide, text, status)
                    VALUES(?, ?, ?, ?)`
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