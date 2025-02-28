const { getDebuggedCode, getCodeAnalysis, getCodeConverted } = require("../AI_Modules/CodeRelatedModules");

const getDebuggedCodeController = async(req,res)=>{
    try {
        const response = await getDebuggedCode(req.body.codeInput);

        return res.status(201).json({
            debuggedCode: response.debuggedCode,
            codeMistakes: response.mistakesFound
          });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

const getCodeAnalysisController = async(req,res)=>{
    try {
        const response = await getCodeAnalysis(req.body.codeInput);
        
        return res.status(201).json({
            codeAnalysis: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

const getCodeConvertedController = async(req,res)=>{
    try {
        const response = await getCodeConverted(req.body.codeInput,req.body.language)

        return res.status(201).json({
            convertedCode: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error})
    }
}

module.exports = {getCodeAnalysisController,getCodeConvertedController,getDebuggedCodeController}