const e = require('cors')
const db = require('../db')


exports.setReqStatus = (studentId) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE Students SET
      Requested_driver = 1
      WHERE Id = ?`;
      return new Promise((resolve, reject) => {
        db.run(sql, [studentId], function (err) {
            if (err) {
                reject(new Error(err.message))
                console.log('test')
                return
            }
            resolve(this.changes);
        })
    })
    });
  }