const dao = require('../query/ReportQuery');

exports.getAllTopics = async (req, res) => {
    try {
        const topics = await dao.getAllTopics();
        return res.status(200).json(topics);
    } catch (error) {
        return res.status(500).json(error.message)        
    }
}

exports.getEvaluationsByStudentId = async (req, res) => {
    const studentId = req.user.id;
    if(!studentId){
        return res.status(401).json({error: "Unauthorized!"})
    }

    try {
        const evaluations = await dao.getEvaluationsByStudentId(studentId);
        return res.status(200).json(evaluations);
    } catch (error) {
        return res.status(500).json(error.message)        
    }
}