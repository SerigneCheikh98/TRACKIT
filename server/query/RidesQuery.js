const db = require('../db')

exports.searchRide = function searchRide(location, date, time, slots) {
    const sql = 'SELECT DriverId, StartingTime, Slot, Date, Name, Surname, Location, Rating FROM Rides, Drivers WHERE Status = 0 AND Slot >= ? AND DriverId = Id AND Date = ?'
    return new Promise((resolve, reject) => {
        db.all(sql, [slots, date], (err, rows) => {
            if (err) {
                reject(new Error(err.message));
                return;
            }
            if(rows.length === 0) 
                resolve([])
            else
                resolve(rows)
        })
    })
}