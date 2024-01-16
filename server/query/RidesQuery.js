const db = require('../db')

/*
    Rides table:
        - Status
            - 0 (pending) --> a driver availability to be booked yet
            - 1 (booked)  --> a student booked for the slot
            - 2 (request) --> a student is requesting a practice
*/

exports.searchRide = function searchRide(location, date, time, slots) {
    const sql = 'SELECT DriverId, StartingTime, Slot, Date, Name, Surname, R.Location, Rating FROM Rides R, Drivers WHERE Status = 0 AND Slot >= ? AND DriverId = Id AND Date = ?'
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

exports.addRequestRide = function addRequestRide(student_id, location, date, time, slots) {
    console.log(student_id)
    console.log(location)
    console.log(date)
    console.log(time)
    console.log(slots)
    const sql = `INSERT INTO Rides(StudentId, Status, StartingTime, Slot, Date, Location)
                    VALUES (?, 2, ?, ?, ?, ?)`
    return new Promise((resolve, reject) => {
        db.run(sql, [student_id, time, slots, date, location], function(err) {
            if(err) {
                reject(new Error(err.message))
                return
            }
            if(this.changes === 0) {
                reject(new Error('No rows updated. Request ID not found.'));
                return;
            }
            resolve(this.changes);
        })
    })
}
