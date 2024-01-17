const dao = require('../query/ReportQuery');

exports.getAllTopics = async function getAllTopics (req, res) {
    try {
        const topics = await dao.getAllTopics();
        return res.status(200).json(topics);
    } catch (error) {
        return res.status(500).json(error.message)        
    }
}
