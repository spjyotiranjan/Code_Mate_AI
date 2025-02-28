import {
  Box,
  Button,
  Container,
  Flex,
  Textarea,
  Spinner,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import Theme from "../Theme";
import axios from "axios";

const CodeConverter = () => {
  const [value, setValue] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function genChat(code, language) {
    try {
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_LOCAL_ENDPOINT_CODING_DATAS}/getConvertedCode`,{codeInput: code,language: language})
      setContent(response.data.convertedCode);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value != "" && language != "") {
            genChat(value, language);
          } else if (value != "" && language == "") {
            setContent("# ***Please provide language to convert***");
          } else if (value == "" && language != "") {
            setContent("# ***Please Provide code***");
          } else {
            setContent("# ***Please Provide code and Programming Language***");
          }
        }}
      >
        <Flex
          w={["100%", "80%"]}
          mx={"auto"}
          h={["60vh", "70vh"]}
          justify={"space-between"}
        >
          <Textarea
            color={"white"}
            borderRadius={"1vw"}
            border={"0.2vw solid White"}
            p={"1vw"}
            placeholder="Please Give code to convert"
            w={"45%"}
            h={["50vh", "65vh"]}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Container
            overflow={"auto"}
            style={{ textAlign: "left" }}
            bgColor={"#00000090"}
            color={"white"}
            borderRadius={"1vw"}
            w={"45%"}
            h={["50vh", "65vh"]}
            border={"0.2vw solid White"}
            p={"1vw"}
          >
            {isLoading ? (
              <Spinner color="white" size={"lg"} />
            ) : (
              <ReactMarkdown style={{ textAlign: "left" }}>
                {content}
              </ReactMarkdown>
            )}
          </Container>
        </Flex>
        <Flex w={["100%", "60%"]} justify={"space-between"} align={"center"}>
          <Box color={"white"} fontSize={["4vw", "1.3vw"]}>
            Convert to{" "}
            <Input
              h={["7vw", "2vw"]}
              w={["60%", "40%"]}
              style={{
                backgroundColor: `${Theme.colors.primary[200]}40`,
                borderRadius: "2vw",
                backdropFilter: "blur(7px)",
                outline: "none",
                padding: "0",
                margin: "0",
                color: "white",
                border: "2px solid #ffffff30",
                filter: "drop-shadow(0 0 1vw #ffffff90)",
                fontSize: "1.4vw",
                textAlign: "center",
                letterSpacing: "0.1vw",
                //   textTransform: "uppercase",
                marginBottom: "10px",
              }}
              type="text"
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            />{" "}
            Programming Language
          </Box>
          <Button
            w={{ base: "40vw", md: "10vw" }}
            h={{ base: "10vw", md: "3vw" }}
            mb={"1vw"}
            color={Theme.colors.secondary[100]}
            backgroundColor={`${Theme.colors.primary[200]}90`}
            _hover={{ backgroundColor: Theme.colors.primary[200] }}
            fontSize={{ base: "4vw", md: "1.3vw" }}
            type="submit"
          >
            Convert
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default CodeConverter;
