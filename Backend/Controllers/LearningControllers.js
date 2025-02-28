const { getTopicDescription, getTopicSubTopics, getSubTopicDescription } = require("../AI_Modules/LearningRelatedModules");

const getTopicDescriptionController = async (req, res) => {
  try {
    const response = await getTopicDescription(req.body.topic);
    return res.status(201).json({
        topicDescription: response
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error})
  }
};

const getTopicSubTopicsController = async(req,res)=>{
    try {
        const response = await getTopicSubTopics(req.body.topic)
        return res.status(201).json({
            subTopics: response
        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({error})
    }
}

const getSubTopicDescriptionController = async(req,res)=>{
    try {
        const response = await getSubTopicDescription(req.body.topic)
        return res.status(201).json({
            description: response
        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({error})
    }
}


module.exports = {getTopicDescriptionController,getTopicSubTopicsController,getSubTopicDescriptionController}