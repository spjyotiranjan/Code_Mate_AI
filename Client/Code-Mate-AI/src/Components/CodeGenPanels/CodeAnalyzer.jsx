import { Button, Container, Flex, Spinner, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react'
import ReactMarkdown from "react-markdown";
import Theme from "../Theme";
import axios from "axios";

const CodeAnalyzer = () => {
      const [value, setValue] = useState("");
      const [content, setContent] = useState("");
      const [isLoading, setIsLoading] = useState(false);

      async function genChat(prompt) {
        try {
          setIsLoading(true);
          const response = await axios.post(`${import.meta.env.VITE_LOCAL_ENDPOINT_CODING_DATAS}/getCodeAnalysis`,{codeInput: prompt})
          setContent(response.data.codeAnalysis);
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
          genChat(value);
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
            placeholder="Please Give code to analyze"
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
              <>
                <ReactMarkdown style={{ textAlign: "left" }}>
                  {content}
                </ReactMarkdown>
              </>
            )}
          </Container>
        </Flex>
        <Button
          w={{ base: "40vw", md: "10vw" }}
          h={{ base: "10vw", md: "3vw" }}
          color={Theme.colors.secondary[100]}
          backgroundColor={`${Theme.colors.primary[200]}90`}
          _hover={{ backgroundColor: Theme.colors.primary[200] }}
          fontSize={{ base: "4vw", md: "1.3vw" }}
          type="submit"
        >
          Analyze
        </Button>
      </form>
    </>
  )
}

export default CodeAnalyzer