const db = require('../db')

exports.deleteNotification = function deleteNotification(student_id, id) {
    const sql = `DELETE FROM Notifications WHERE idUser = ? AND id = ?`
    return new Promise((resolve, reject) => {
        db.run(sql, [student_id, id], function (err) {
            if (err) { 
                reject(new Error(err.message))
                return
            }
            if (this.changes === 0) {
                reject(new Error('No rows deleted'));
                return;
            }
            resolve(this.changes);
        })
    })
}

exports.getNotification = function getNotification(student_id) {
    const sql = `SELECT * FROM Notifications WHERE idUser = ?`
    return new Promise((resolve, reject) => {
        db.all(sql, [student_id], (err, rows) => {
            if (err) {
                reject(new Error(err.message))
                return
            }
            console.log(rows)
            if (!rows) {
                resolve([])
                return;
            }
            resolve(rows);
        })
    })
}
