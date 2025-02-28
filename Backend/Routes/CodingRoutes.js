const express = require("express");
const { getDebuggedCodeController, getCodeAnalysisController, getCodeConvertedController } = require("../Controllers/CodingControllers");
const CodingRoutes =  express.Router()

CodingRoutes.post("/getDebuggedCode",getDebuggedCodeController)
CodingRoutes.post("/getCodeAnalysis",getCodeAnalysisController)
CodingRoutes.post("/getConvertedCode",getCodeConvertedController)



module.exports = CodingRoutes