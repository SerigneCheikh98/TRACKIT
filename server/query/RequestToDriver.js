const db = require('../db')


exports.setReqStatus = (studentId) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Students SET
      Requested_driver = 1
      WHERE Id = ?`;
        db.run(sql, [studentId], function (err) {
            if (err) {
                reject(new Error(err.message))
                console.log('test')
                return
            }
            resolve(this.changes);
        })
    })
  }

  exports.deleteReq = (studentId) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Students SET
      Requested_driver = 0
      WHERE Id = ?`;
        db.run(sql, [studentId], function (err) {
            if (err) {
                reject(new Error(err.message))
                console.log('test delete')
                return
            }
            resolve(this.changes);
        })
    })
  }