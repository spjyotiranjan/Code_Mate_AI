require("dotenv").config();
const { ChatOpenAI } = require("@langchain/openai");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

const getDebuggedCode = async (codeInput) => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.7,
  });

  const code_debugger_prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You're task is to debug the given code, only give the debugged code, nothing else. Give the output in markdown format.",
    ],
    ["human", "{codeInput}"],
  ]);
  const code_fault_prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You're task is to find the mistake in the given code and only give the mistake and don't give corrected code, nothing else. Give the output in markdown format.",
    ],
    ["human", "{codeInput}"],
  ]);

  const code_debugger_chain = code_debugger_prompt
    .pipe(model)
    .pipe(new StringOutputParser());
  const code_fault_chain = code_fault_prompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const code_debugger_res = await code_debugger_chain.invoke({
    codeInput,
  });
  const code_fault_res = await code_fault_chain.invoke({
    codeInput,
  });

  const res = {
    debuggedCode: code_debugger_res,
    mistakesFound: code_fault_res,
  };
  console.log(res);

  return res;
};

const getCodeAnalysis = async (codeInput) => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.7,
  });

  const code_analysis_prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You're task is to analyze the given code, give different analysis like Time Complexity, Space Complexity for DSA, and performance based Analysis for any other code, give suggestion for better code, nothing else. Give the output descriptively. Give the whole output in markdown format with proper formatting for Heading, sub heading, etc. Don't miss formatting for any part of output",
    ],
    ["human", "{codeInput}"],
  ]);
  const code_analysis_chain = code_analysis_prompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const res = await code_analysis_chain.invoke({
    codeInput,
  });

  console.log(res);
  return res;
};

const getCodeConverted = async (codeInput, language) => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.7,
  });

  const code_convert_prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You're task is to convert the given code into {language} language and give the converted code only, nothing else. Give the output in markdown format.",
    ],
    ["human", "{codeInput}"],
  ]);

  const code_convert_chain = code_convert_prompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const res = await code_convert_chain.invoke({
    codeInput,
    language,
  });

  console.log(res);
  return res;
}


module.exports = {getCodeAnalysis,getCodeConverted,getDebuggedCode}
