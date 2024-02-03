const e = require('cors')
const db = require('../db')

/*
    Rides table:
        - Status
            - 0 (pending) --> a driver availability to be booked yet
            - 1 (booked)  --> a student booked for the slot
            - 2 (request) --> a student is requesting a practice
*/

exports.searchRide = function searchRide(location, date, time, slots) {
    const sql = 'SELECT DriverId, StartingTime, Slot, Date, Name, Surname, R.Location, Rating, Description, RideId FROM Rides R, Drivers WHERE Status = 0 AND Slot >= ? AND DriverId = Id AND Date = ?'
    return new Promise((resolve, reject) => {
        db.all(sql, [slots, date], (err, rows) => {
            if (err) {
                reject(new Error(err.message));
                return;
            }
            if(rows.length === 0) 
                resolve([])
            else {
                resolve(rows)
            }
        })
    })
}

exports.bookRide = function bookRide(rideId, studentId, startingTime, slot){
    const sql = 'UPDATE Rides SET Status = 1, StudentId = ?, StartingTime = ?, Slot = ? WHERE RideId = ? '
    return new Promise((resolve, reject) => {
        db.run(sql, [studentId, startingTime, slot, rideId], function (err) {
            if (err) {
                reject(new Error(err.message))
                return
            }
            resolve(this.changes);
        })
    })
}

exports.addRide = function addRide(driverId, location, date, time, slots) {
    console.log(driverId, location, date, time, slots)
    const sql = `INSERT INTO Rides(DriverId, Status, StartingTime, Slot, Date, Location)
                    VALUES (?, 0, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        db.run(sql, [driverId, time, slots, date, location], function(err) {
            if(err) {
                reject(new Error(err.message))
                return
            }
            if(this.changes === 0) {
                reject(new Error('No rows updated'));
                return;
            }
            resolve(this.lastID);
        })
    })
}

exports.getDailyRide = function getDailyRide(date) {
    const sql = 'SELECT DriverId, StartingTime, Slot, Date, Name, Surname, R.Location, Rating, Description FROM Rides R, Drivers WHERE Status = 0 AND DriverId = Id AND Date = ?'
    return new Promise((resolve, reject) => {
        db.all(sql, [date], (err, rows) => {
            if (err) {
                reject(new Error(err.message));
                return;
            }
            if(rows.length === 0) 
                resolve([])
            else {
                resolve(rows)
            }
        })
    })
}

exports.addRequestRide = function addRequestRide(student_id, location, date, time, slots) {
    const sql = `INSERT INTO Rides(StudentId, Status, StartingTime, Slot, Date, Location)
                    VALUES (?, 2, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        db.run(sql, [student_id, time, slots, date, location], function(err) {
            if(err) {
                reject(new Error(err.message))
                return
            }
            if(this.changes === 0) {
                reject(new Error('No rows updated'));
                return;
            }
            resolve(this.lastID);
        })
    })
}

exports.deleteRequestRide = function deleteRequestRide(student_id, ride_id) {
    const sql = `DELETE FROM Rides WHERE StudentId = ? AND RideId = ? AND DriverId IS NULL`
    return new Promise((resolve, reject) => {
        db.run(sql, [student_id, ride_id], function (err) {
            if (err) {
                reject(new Error(err.message))
                return
            }
            resolve(this.changes);
        })
    })
}

exports.deleteBooking = function deleteRequestRide(student_id, ride_id) {
    const sql = `UPDATE Rides SET StudentId = NULL WHERE StudentId = ? AND RideId = ? AND DriverId IS NOT NULL`
    return new Promise((resolve, reject) => {
        db.run(sql, [student_id, ride_id], function (err) {
            if (err) {
                reject(new Error(err.message))
                return
            }
            resolve(this.changes);
        })
    })
}

exports.selectRide = function selectRide(ride_id) {
    const sql = 'SELECT * FROM Rides WHERE RideId = ?'
    return new Promise((resolve, reject) => {
        db.get(sql, [ride_id], (err, row) => {
            if (err) {
                reject(new Error(err.message));
            }
            else {
                resolve(row)
            }
        })
    })
}