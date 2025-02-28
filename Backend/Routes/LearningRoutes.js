const express = require("express");
const { getTopicDescriptionController, getTopicSubTopicsController, getSubTopicDescriptionController } = require("../Controllers/LearningControllers");
const LearningRoutes =  express.Router()


LearningRoutes.post("/getTopicDescription",getTopicDescriptionController)
LearningRoutes.post("/getTopicSubTopics",getTopicSubTopicsController)
LearningRoutes.post("/getSubTopicDescription",getSubTopicDescriptionController)

module.exports = LearningRoutes