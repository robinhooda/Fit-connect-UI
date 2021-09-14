import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
  chakra,
  Spinner,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { login } from "./authenticationSlice";
import Logo from "../../assets/images/logo.svg"
import HomeBanner from "../../assets/images/homeBanner.jpg"


export const Login = () => {
  const toast = useToast();

  const [{ userName, password }, setInputs] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const user = auth.login;

  useEffect(() => {
    if (user.token) {
      navigate("/home");
    }
  }, [user.token]);

  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    await dispatch(login({ userName, password }));
    toast({
      title: "Successfully Logged in.",
      status: "success",
      duration: 3000,
      isClosable: true,
      fontFamily: "default.heading",
    });
  };

  return (
    <>
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
              Fit connect
            </Heading>
            <form onSubmit={loginHandler}>
              <FormControl
                paddingTop={"2"}
                color={"brand.offWhite"}
                id="userName"
              >
                <FormLabel>Username</FormLabel>
                <Input
                  type="userName"
                  onChange={(e) => {
                    setInputs((input) => ({
                      ...input,
                      userName: e.target.value,
                    }));
                  }}
                />
              </FormControl>
              <FormControl
                paddingTop={"5"}
                paddingBottom={"8"}
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
                w={"100%"}
                _hover={{
                  border: "1px",
                  borderColor: "brand.button",
                  color: "brand.white",
                  background: "brand.primary",
                }}
                fontWeight={"400"}
                type="submit"
              >
                Login
              </Button>
              <chakra.p color={"brand.white"} textAlign={"center"} mt={"3"}>
                or
              </chakra.p>
              <Button
                backgroundColor={"brand.secondary"}
                color={"brand.white"}
                variant={"solid"}
                fontSize={"lg"}
                h={"50px"}
                w={"100%"}
                _hover={{
                  border: "1px",
                  borderColor: "brand.button",
                  color: "brand.white",
                  background: "brand.primary",
                }}
                onClick={() =>
                  setInputs((inputs) => ({
                    ...inputs,
                    userName: "testUser",
                    password: "qwerty",
                  }))
                }
                fontWeight={"400"}
                mt={"4"}
                type="submit"
              >
                Login via Test Credentials
              </Button>
            </form>

            <Heading
              fontFamily={"default.heading"}
              color={"brand.offWhite"}
              fontSize={"1xl"}
              fontWeight={"medium"}
              paddingTop={"1"}
            >
              Don't have an account? <Link to="/register">
                 <chakra.span _hover={{ color:"brand.button"}}>
                 Register Here
                 </chakra.span>
                 </Link>
            </Heading>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={HomeBanner}
            width="100%"
            height="100vh"
          />
        </Flex>
      </Stack>

      {auth.loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </>
  );
};
