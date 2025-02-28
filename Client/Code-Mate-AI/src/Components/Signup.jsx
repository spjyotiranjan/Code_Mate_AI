import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Link,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import Background from "./../assets/EduFlexBackground.jpg";
import Theme from "./Theme";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "../Context/ParentContext";
import Logo from "./../assets/CodeGen.png";
import { ViewIcon } from "@chakra-ui/icons";

const Signup = () => {
  const Navigate = useNavigate();
  const {
    login,
    setLogin,
    signup,
    setSignup,
    setCookies,
    errorMessage,
    setErrorMessage,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm();
  const FormSubmitHandler = (data) => {
    console.log(data);
    trigger();
    ErrorToastHandler();
    PostRequest(data);
  };

  const PostRequest = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://hackversehackathon.onrender.com/api/Users/signup",
        {
          ...data,
        }
      );
      setLogin(true);
      setIsLoading(false);
      SuccessToastHandler();
      // const access = res.data.access_token;

      setCookies("UserName", res.data.postUser.UserName, 30);
      setCookies("Password", res.data.postUser.Password, 30);
      setCookies("Name", res.data.postUser.Name, 30);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const SuccessToastHandler = () => {
    toast.success("Signed Up Successfully", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      Navigate("/");
    }, 5000);
  };

  const ErrorToastHandler = () => {
    if (isSubmitted && !isSubmitSuccessful) {
      for (const errorKey in errors) {
        const errorMessage = errors[errorKey]?.message;
        if (errorMessage) {
          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Box
        bgImage={`linear-gradient(0deg, #22033900 0.00%,#22033933 80.00%),linear-gradient(90deg, #22033966 0.00%,#22033900 30.00%),linear-gradient(90deg, #22033900 70.00%,#22033966 100.00%),linear-gradient(180deg, #22033900 30.00%,#220339 100.00%),url(${Background})`}
        backgroundSize={"cover"}
        width={"100vw"}
        minHeight={"100vh"}
      >
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Flex
            borderRadius={[12]} // Responsive borderRadius
            backgroundColor={`${Theme.colors.primary[300]}90`}
            width={["90vw", null, "50vw", "35vw"]}
            height={["80vh", null, "95vh", "80vh"]}
            flexDir={"column"}
            p={"3vw"}
            px={["8vw", "3vw"]}
            mt={["20vw", "10vw", "8vw"]} // Responsive top margin
          >
            <Image
              src={Logo}
              alt="logo"
              width={["100px", "120px", "170px"]} // Responsive width
              height={["30px", "36px", "40px"]} // Responsive height
              mb={["20px", "25px", "30px"]} // Responsive margin bottom
              alignSelf={"center"}
            />

            <form onSubmit={handleSubmit(FormSubmitHandler)}>
              <FormControl mb={5} color={"white"}>
                <FormControl isInvalid={errors.Name} mb={5}>
                  <Input
                    focusBorderColor={Theme.colors.primary[100]}
                    variant="flushed"
                    placeholder="Name"
                    type="text"
                    {...register("Name", {
                      required: "Enter Your Name",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters allowed",
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.Name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.EmailId} mb={5}>
                  <Input
                    focusBorderColor={Theme.colors.primary[100]}
                    variant="flushed"
                    placeholder="Email-ID"
                    type="email"
                    {...register("EmailId", {
                      required: "Enter Your Email Address",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email Address",
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.EmailId?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.UserName} mb={5}>
                  <Input
                    focusBorderColor={Theme.colors.primary[100]}
                    variant="flushed"
                    placeholder="UserName"
                    type="text"
                    {...register("UserName", {
                      required: "Enter your UserName",
                      minLength: {
                        value: 4,
                        message: "Minimum 4 characters required",
                      },
                      maxLength: {
                        value: 20,
                        message: "Maximum 20 characters allowed",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.UserName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.Password} mb={5}>
                  <Input
                    icon={<ViewIcon />}
                    focusBorderColor={Theme.colors.primary[100]}
                    variant="flushed"
                    placeholder="Password"
                    type="password"
                    {...register("Password", {
                      required: "Enter your Password",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 characters required",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Invalid Password",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.Password?.message}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent={"center"} gap={3} flexDir={"column"}>
                  <Flex
                    justifyContent={"center"}
                    color={Theme.colors.primary[300]}
                  >
                    {errorMessage && <Center>{errorMessage}</Center>}
                  </Flex>
                  <Button
                    isLoading={isLoading}
                    bgColor={`${Theme.colors.primary[200]}80`}
                    _hover={{ backgroundColor: Theme.colors.primary[200] }}
                    color={"white"}
                    borderRadius={4}
                    mt={2}
                    px={8}
                    py={5}
                    fontSize={12}
                    mx={"auto"}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Flex>
                <Flex justifyContent={"center"} gap={2} mt={5}>
                  <Center color={Theme.colors.secondary[100]}>
                    Already have an account?
                  </Center>
                  <Link href={"/login"} color={Theme.colors.primary[200]}>
                    Login
                  </Link>
                </Flex>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Signup;
