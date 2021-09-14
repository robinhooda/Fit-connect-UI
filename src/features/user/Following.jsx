import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { UserCard } from "../../components/UserCard";
import { Image, Heading, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import EmptyState from "../../assets/images/empty_state.svg"

export const Following = () => {
  const { userName } = useParams();
  const user = useSelector((state) => state.users.users).find(
    (user) => user.userName === userName
  );

  return (
    <Box minH={"100vh"} backgroundColor={"brand.primary"}>
      <Navbar />
      {user.following.map((userId) => (
        <UserCard key={userId} userId={userId} />
      ))}
      {user.following.length === 0 && (
        <>
          <Box maxW={"8xl"} mx={"auto"}>
            <Box
              minH={"40vh"}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              flexDirection={"column"}
              my={"32"}
            >
              <Image
                src={EmptyState}
                w={"auto"}
                height={"80"}
                mx={"auto"}
                display={"block"}
              ></Image>
              <Heading
                fontFamily={"default.heading"}
                fontSize={"xl"}
                color={"brand.white"}
                fontWeight={"400"}
                textAlign={"center"}
                my={"6"}
              >
                You are not following anyone, Once you do they'll be listed here
              </Heading>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
