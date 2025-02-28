import React, { useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ReactMarkdown from 'react-markdown'
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import axios from "axios";

const SubTopicDetail = ({ subTopics }) => {
  const [details, setDetails] = useState("");
  const [fetched, setFetched] = useState(true);
  async function genContent(topic) {
    try {
      setFetched(false);
      const response = await axios.post(`${import.meta.env.VITE_LOCAL_ENDPOINT_LEARNING_DATAS}/getSubTopicDescription`,{topic})
      setDetails(response.data.description);
      setFetched(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    genContent(subTopics);
  }, []);
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left" fontSize="2xl">
            {subTopics}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {fetched ? (
          // <UnorderedList>
          //   {details.map((e, i) => {
          //     return <ListItem key={i}>{e}</ListItem>;
          //   })}
          // </UnorderedList>
          <ReactMarkdown>
            {details}
          </ReactMarkdown>
        ) : (
          <UnorderedList>
            <Center>
              <Spinner />
            </Center>
          </UnorderedList>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SubTopicDetail;
