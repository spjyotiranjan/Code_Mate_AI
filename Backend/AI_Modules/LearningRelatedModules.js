require("dotenv").config();
const { ChatOpenAI } = require("@langchain/openai");
const {
  StringOutputParser,
  CommaSeparatedListOutputParser,
} = require("@langchain/core/output_parsers");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

const getTopicDescription = async (topic) => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.7,
  });

  const topic_description_prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You're task is to make a learning content for the given topic. Give a basic idea in 100 words and 3 paragraph about the topic. Don't include declaration of paragraphs. give the output in markdown format.",
    ],
    ["human", "{topic}"],
  ]);

  const topic_description_chain = topic_description_prompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const res = await topic_description_chain.invoke({
    topic,
  });

  console.log(res);
  return res;
};

const getTopicSubTopics = async (topic) => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o",
    temperature: 0.7,
  });

  const subTopic_prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You're task is to make a learning content for the given topic. Give 10 subtopic about the topic that will be roadmap for learning the topic. Only give subtopics in comma separated values. nothing else",
    ],
    ["human", "{topic}"],
  ]);

  const subTopic_chain = subTopic_prompt
    .pipe(model)
    .pipe(new CommaSeparatedListOutputParser());

  const res = await subTopic_chain.invoke({
    topic,
  });

  console.log(res);
  return res;
};
const getSubTopicDescription = async (topic) => {
    const model = new ChatOpenAI({
      modelName: "gpt-4o",
      temperature: 0.7,
    });
  
    const topic_description_prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You're task is to make a learning content for the given topic. Give Overview of the topic given in 100 words in bulletins in markdown format. Don't include declaration of paragraphs.Have Bulletins and give the output in markdown format.",
      ],
      ["human", "{topic}"],
    ]);
  
    const topic_description_chain = topic_description_prompt
      .pipe(model)
      .pipe(new StringOutputParser());
  
    const res = await topic_description_chain.invoke({
      topic,
    });
  
    console.log(res);
    return res;
  };


module.exports = {getTopicDescription,getTopicSubTopics,getSubTopicDescription}