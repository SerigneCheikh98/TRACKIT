const db = require('../db');

exports.getAllTopics = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Topics`;
    db.all(query, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}


