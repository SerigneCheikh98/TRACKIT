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

exports.getEvaluationsByStudentId = (studentId) => {
  return new Promise((resolve, reject) => {
    // SELECT Evaluations.RideId, 
    //  Evaluations.TopicId, 
    //  Evaluations.StudentId, 
    //  Evaluations.Rating, 
    //  Topics.Title
    // FROM Evaluations
    // JOIN Topics ON Evaluations.TopicId = Topics.Id
    // WHERE Evaluations.StudentId=?;
    const query = `SELECT * FROM Evaluations WHERE StudentId=?`;
    db.all(query,[studentId], (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
}
