import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  chakra,
  useMediaQuery,
  Spinner,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "./authenticationSlice";
import Logo from "../../assets/images/logo.svg"
import HomeBanner from "../../assets/images/homeBanner.jpg"

export const Register = () => {
  const toast = useToast();

  const [{ userName, password, email, fullName }, setInputs] = useState({
    fullName: "",
    password: "",
    email: "",
    userName: "",
  });

  const dispatch = useDispatch();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)")

  const registerUserHandler = async (e) => {
    e.preventDefault();
    await dispatch(register({ userName, password, email, fullName }));
    setInputs((input) => ({
      ...input,
      userName: "",
      fullName: "",
      password: "",
      email: "",
    }));

    // to do : add status code and then show toast
    toast({
      title: "Account created.",
      description: "Please Login with your newly created credentials.",
      status: "success",
      duration: 3000,
      isClosable: true,
      fontFamily: "default.heading",
    });
  };

  return (
    <Stack
      fontFamily={"default.heading"}
      backgroundColor={"brand.primary"}
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image
            alt={"logo"}
            objectFit={"contain"}
            height={"6rem"}
            marginRight={"auto"}
            src={Logo}
          />
          <Heading
            fontFamily={"default.heading"}
            color={"brand.white"}
            fontSize={"4xl"}
          >
            Fit Connect
          </Heading>
          <FormControl paddingTop={"2"} color={"brand.offWhite"} id="fullName">
            <FormLabel>Full Name</FormLabel>
            <Input
              type="fullName"
              value={fullName}
              onChange={(e) => {
                setInputs((input) => ({
                  ...input,
                  fullName: e.target.value,
                }));
              }}
            />
          </FormControl>
          <FormControl paddingTop={"2"} color={"brand.offWhite"} id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setInputs((input) => ({
                  ...input,
                  email: e.target.value,
                }));
              }}
            />
          </FormControl>
          <FormControl paddingTop={"2"} color={"brand.offWhite"} id="userName">
            <FormLabel>Username</FormLabel>
            <Input
              type="userName"
              value={userName}
              onChange={(e) => {
                setInputs((input) => ({
                  ...input,
                  userName: e.target.value,
                }));
              }}
            />
          </FormControl>
          <FormControl
            paddingTop={"2"}
            paddingBottom={"4"}
            color={"brand.offWhite"}
            id="password"
          >
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => {
                setInputs((input) => ({
                  ...input,
                  password: e.target.value,
                }));
              }}
            />
          </FormControl>
          <Button
            backgroundColor={"brand.button"}
            color={"brand.white"}
            variant={"solid"}
            fontSize={"xl"}
            h={"50px"}
            _hover={{
              border: "1px",
              borderColor: "brand.button",
              color: "brand.white",
              background: "brand.primary",
            }}
            onClick={registerUserHandler}
            fontWeight={"500"}
            type="submit"
          >
            Register
          </Button>

          <Heading
            fontFamily={"default.heading"}
            color={"brand.offWhite"}
            fontSize={"1xl"}
            fontWeight={"medium"}
            paddingTop={"1"}
          >
            Already have an account? <Link to="/login"> <chakra.span _hover={{ color:"brand.button"}}>
                 Sign In
                 </chakra.span></Link>
          </Heading>
        </Stack>
      </Flex>
      {isLargerThan768 &&  
        (<Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={HomeBanner}
            width="100%"
            height="100vh"
          />
        </Flex>)}
    </Stack>
  );
};
