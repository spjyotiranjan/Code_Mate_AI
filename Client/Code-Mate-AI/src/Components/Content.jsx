import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Spinner,
  Center,
  Accordion,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

import Background from "./../assets/EduFlexBackground.jpg";
import Theme from "./Theme";
import SubTopicDetail from "./SubTopicDetail";
import axios from "axios";

const Content = () => {
  const [subTopics, setSubTopics] = useState([]);
  const [value, setValue] = useState("");
  const [fetched, setFetched] = useState(true);
  const [contentFetched, setContentFetched] = useState(true);
  const [content, setContent] = useState("");
  const [showFullContent, setShowFullContent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    subtopic(value);
    genDescription(value); 
  };

  function removeAsterisks(str) {
    return str.replace(/\*/g, "");
  }

  async function subtopic(topic) {
    try {
      setFetched(false);
      const response = await axios.post(`${import.meta.env.VITE_LOCAL_ENDPOINT_LEARNING_DATAS}/getTopicSubTopics`,{topic})
      setSubTopics(response.data.subTopics);
      setFetched(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function genDescription(topic) {
    try {
      setContentFetched(false);
      const response = await axios.post(`${import.meta.env.VITE_LOCAL_ENDPOINT_LEARNING_DATAS}/getTopicDescription`,{topic})
      setContent(response.data.topicDescription);
      setContentFetched(true);
    } catch (error) {
      console.log(error);
    }
  }

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box background={Theme.colors.primary[100]} width="99vw" minH={"100vh"}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        bgImage={`linear-gradient(0deg, #22033900 0.00%,#22033933 80.00%),linear-gradient(90deg, #22033966 0.00%,#22033900 30.00%),linear-gradient(90deg, #22033900 70.00%,#22033966 100.00%),linear-gradient(180deg, #22033900 30.00%,#220339 100.00%),url(${Background})`}
        width="100%"
        height={{ base: "30vh", md: "50vh" }}
        backgroundSize="cover"
      >
        <form onSubmit={handleSubmit} style={{ marginTop: "10vw" }}>
          <Flex
            direction={"column"}
            w={{ base: "90vw", md: "80vw" }}
            h={{ base: "20vh", md: "10vw" }}
            justify={"space-between"}
            align={"center"}
            px={isMobile ? "0" : "2vw"}
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                width: "100%",
                height: isMobile ? "15vw" : "4vw",
                backgroundColor: `${Theme.colors.primary[200]}40`,
                borderRadius: "2vw",
                backdropFilter: "blur(7px)",
                outline: "none",
                padding: "0",
                margin: "0",
                color: "white",
                border: "2px solid #ffffff30",
                filter: "drop-shadow(0 0 1vw #ffffff90)",
                fontSize: isMobile ? "4vw" : "1.4vw",
                textAlign: "center",
                letterSpacing: "0.1vw",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
              placeholder="WRITE ANY TOPIC YOU WANT TO LEARN"
            />
            <Button
              w={{ base: "40vw", md: "10vw" }}
              h={{ base: "10vw", md: "3vw" }}
              color={Theme.colors.secondary[100]}
              backgroundColor={`${Theme.colors.primary[200]}90`}
              _hover={{ backgroundColor: Theme.colors.primary[200] }}
              fontSize={{ base: "4vw", md: "1.3vw" }}
              type="submit"
            >
              Learn
            </Button>
          </Flex>
        </form>
      </Flex>

      {contentFetched ? (
        <Flex direction={"column"} align={"center"} my={"3vw"}>
          {content !== "" && (
            <Flex direction="column" align="center" mb="3vw">
              <Heading
                style={{ textTransform: "uppercase" }}
                color={"white"}
                mt={isMobile ? "8vw" : "1vw"}
                mb={isMobile ? "8vw" : "4vw"}
                fontSize={isMobile ? "4xl" : "4xl"}
              >
                {value}
              </Heading>
              <Text w={"80vw"} textAlign={"center"} color={"white"}>
                {isMobile ? (
                  <>
                    {showFullContent ? content : `${content.slice(0, 200)}...`}
                    <br />
                    <Button
                      mt="10"
                      onClick={() => setShowFullContent(!showFullContent)}
                    >
                      {showFullContent ? "Read less" : "Read more"}
                    </Button>
                  </>
                ) : (
                  content
                )}
              </Text>
            </Flex>
          )}
        </Flex>
      ) : (
        <Center>
          <Heading color={"white"}>Generating ...</Heading>
        </Center>
      )}

      {fetched && contentFetched ? (
        <Flex direction={"column"} align={"center"}>
          {subTopics.length !== 0 && (
            <Heading
              color={"white"}
              mb={"2vw"}
              fontSize={isMobile ? "3xl" : "4xl"}
            >
              Learn {value} in 10 parts
            </Heading>
          )}
          <Accordion w={"80vw"} allowToggle color={"white"} pb={"4vw"}>
            {subTopics.map((e, index) => (
              <SubTopicDetail key={index} subTopics={e} />
            ))}
          </Accordion>
        </Flex>
      ) : (
        <Center>
          <Spinner
            color="blue"
            size={"xl"}
            thickness="0.3vw"
            speed="0.65s"
            emptyColor="gray.200"
          />
        </Center>
      )}
    </Box>
  );
};

export default Content;
