const db = require('../db')
const crypto = require('crypto');


exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Students WHERE Email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          resolve(false);
        }
        else {
          const user = { id: row.Id, name: row.Name, surname: row.Surname, email: row.Email , role: 'student' };
  
          crypto.scrypt(password, row.Salt, 32, function (err, hashedPassword) {
            if (err) reject(err);
            if (!crypto.timingSafeEqual(Buffer.from(row.Password, 'hex'), hashedPassword))
              resolve(false);
            else
              resolve(user);
          });
        }
      });
    });
  };
  