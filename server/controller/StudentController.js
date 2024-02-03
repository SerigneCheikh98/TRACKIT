'use state'
const studentQuery = require('../query/StudentQuery')

exports.getStudentById = async (req, res) => {
    const studentId = req.user.id;
    if(!studentId){
        return res.status(401).json({error: "Unauthorized!"})
    }

    try {
        const student = await studentQuery.getStudentById(studentId);
        return res.status(200).json(student);
    } catch (error) {
        return res.status(500).json(error)        
    }
}